import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { CATEGORIES } from '@/data/categories'
import styles from './SellYourbussiness.module.css'

const MAX_DESCRIPTION_LENGTH = 500
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const INITIAL_FORM = {
  shopName: '',
  businessEmail: '',
  businessCategory: '',
  phoneNumber: '',
  shopAddress: '',
  dealHeadline: '',
  discountPercentage: '',
  couponCode: '',
  originalPrice: '',
  offerPrice: '',
  expiryDate: '',
  description: '',
}

/* ── Helpers ────────────────────────────────────────────────────── */

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10 && /^[6-9]\d{9}$/.test(digits)
}

function getTomorrowDateStr() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

/* ── Component ──────────────────────────────────────────────────── */

export default function SellYourbussiness() {
  const { userProfile, isBusiness } = useAuth()
  const navigate = useNavigate()

  /* ── Form state ─────────────────────────────────────────────── */
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const fileInputRef = useRef(null)
  const formRef = useRef(null)
  const firstErrorRef = useRef(null)

  /* ── Handlers ───────────────────────────────────────────────── */

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev }
        delete next[name]
        return next
      }
      return prev
    })
  }, [])

  const handleImageSelect = useCallback((file) => {
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: 'Please select a JPG, JPEG, PNG, or WebP image.',
      }))
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        image: `Image must be smaller than ${formatFileSize(MAX_FILE_SIZE)}. Selected: ${formatFileSize(file.size)}.`,
      }))
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setErrors((prev) => {
      if (prev.image) {
        const next = { ...prev }
        delete next.image
        return next
      }
      return prev
    })
  }, [])

  const handleFileInputChange = useCallback(
    (e) => {
      handleImageSelect(e.target.files?.[0])
    },
    [handleImageSelect]
  )

  const handleRemoveImage = useCallback(() => {
    setImageFile(null)
    setImagePreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
      handleImageSelect(e.dataTransfer.files?.[0])
    },
    [handleImageSelect]
  )

  /* ── Validation ─────────────────────────────────────────────── */

  function validate() {
    const errs = {}

    // Shop Name
    const shopName = form.shopName.trim()
    if (!shopName) {
      errs.shopName = 'Shop name is required.'
    } else if (shopName.length < 3) {
      errs.shopName = 'Shop name must be at least 3 characters.'
    }

    // Business Email
    const businessEmail = form.businessEmail.trim()
    if (!businessEmail) {
      errs.businessEmail = 'Business email is required.'
    } else if (!validateEmail(businessEmail)) {
      errs.businessEmail = 'Please enter a valid email address.'
    }

    // Business Category
    if (!form.businessCategory) {
      errs.businessCategory = 'Please select a business category.'
    }

    // Phone Number
    const phone = form.phoneNumber.trim()
    if (!phone) {
      errs.phoneNumber = 'Phone number is required.'
    } else if (!validatePhone(phone)) {
      errs.phoneNumber = 'Please enter a valid 10-digit Indian mobile number starting with 6-9.'
    }

    // Shop Address
    const address = form.shopAddress.trim()
    if (!address) {
      errs.shopAddress = 'Shop address is required.'
    } else if (address.length < 10) {
      errs.shopAddress = 'Please enter a complete address (at least 10 characters).'
    }

    // Deal Headline
    const headline = form.dealHeadline.trim()
    if (!headline) {
      errs.dealHeadline = 'Deal / offer headline is required.'
    } else if (headline.length < 5) {
      errs.dealHeadline = 'Headline must be at least 5 characters.'
    }

    // Discount Percentage
    const discount = form.discountPercentage.trim()
    const discountNum = discount === '' ? NaN : Number(discount)
    if (!discount) {
      errs.discountPercentage = 'Discount percentage is required.'
    } else if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
      errs.discountPercentage = 'Discount must be between 0 and 100.'
    }

    // Coupon Code (optional)
    if (form.couponCode.trim()) {
      const code = form.couponCode.trim()
      if (!/^[A-Za-z0-9_-]+$/.test(code)) {
        errs.couponCode = 'Coupon code can only contain letters, numbers, hyphens, and underscores.'
      }
    }

    // Original Price
    const origPrice = form.originalPrice.trim()
    const origPriceNum = origPrice === '' ? NaN : Number(origPrice)
    if (!origPrice) {
      errs.originalPrice = 'Original price is required.'
    } else if (isNaN(origPriceNum) || origPriceNum <= 0) {
      errs.originalPrice = 'Original price must be greater than 0.'
    }

    // Offer Price
    const offerPrice = form.offerPrice.trim()
    const offerPriceNum = offerPrice === '' ? NaN : Number(offerPrice)
    if (!offerPrice) {
      errs.offerPrice = 'Offer / deal price is required.'
    } else if (isNaN(offerPriceNum) || offerPriceNum <= 0) {
      errs.offerPrice = 'Offer price must be greater than 0.'
    } else if (!isNaN(origPriceNum) && offerPriceNum > origPriceNum) {
      errs.offerPrice = 'Offer price cannot be greater than original price.'
    }

    // Cross-check: discount vs price difference
    if (
      !isNaN(origPriceNum) &&
      !isNaN(offerPriceNum) &&
      origPriceNum > 0 &&
      offerPriceNum > 0 &&
      offerPriceNum <= origPriceNum &&
      !isNaN(discountNum) &&
      discountNum >= 0 &&
      discountNum <= 100
    ) {
      const actualDiscount = ((origPriceNum - offerPriceNum) / origPriceNum) * 100
      const enteredDiscount = discountNum
      if (Math.abs(actualDiscount - enteredDiscount) > 5) {
        errs.discountPercentage = `Entered ${enteredDiscount}% but prices reflect ~${actualDiscount.toFixed(0)}% discount. Please adjust.`
      }
    }

    // Expiry Date
    if (!form.expiryDate) {
      errs.expiryDate = 'Deal expiry date is required.'
    } else {
      const expiryDate = new Date(form.expiryDate + 'T23:59:59')
      const tomorrow = new Date(getTomorrowDateStr() + 'T00:00:00')
      if (expiryDate < tomorrow) {
        errs.expiryDate = 'Expiry date must be in the future.'
      }
    }

    // Image
    if (!imageFile) {
      errs.image = 'Please upload a shop & offer image.'
    }

    return errs
  }

  /* ── Submit ─────────────────────────────────────────────────── */

  async function handleSubmit(e) {
    e.preventDefault()

    // Role gate — frontend UX only; backend enforces authorization independently
    if (!isBusiness) {
      return
    }

    const errs = validate()
    setErrors(errs)

    if (Object.keys(errs).length > 0) {
      // Scroll to first error
      const firstKey = Object.keys(errs)[0]
      const fieldEl =
        document.querySelector(`[name="${firstKey}"]`) ||
        document.querySelector(`.${styles.imageUploadArea}`)
      if (fieldEl) {
        fieldEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        fieldEl.focus()
      }
      return
    }

    setIsSubmitting(true)

    // ── SIMULATION: No backend call ─────────────────────────────
    // In production, replace this block with:
    //
    // const formData = new FormData()
    // formData.append('shopName', form.shopName.trim())
    // formData.append('businessEmail', form.businessEmail.trim())
    // ... append all fields ...
    // formData.append('image', imageFile)
    //
    // const response = await fetch('/api/businesses', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${token}` },
    //   body: formData,
    // })
    // if (!response.ok) throw new Error('Submission failed')

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  /* ── Computed discount info ─────────────────────────────────── */

  function getDiscountInfo() {
    const orig = Number(form.originalPrice)
    const offer = Number(form.offerPrice)
    if (!orig || !offer || orig <= 0 || offer <= 0 || offer > orig) return null
    const pct = ((orig - offer) / orig) * 100
    const saved = orig - offer
    return { pct: pct.toFixed(0), saved: saved.toFixed(0) }
  }

  const discountInfo = getDiscountInfo()

  /* ── Normal User: Promotion Panel ───────────────────────────── */

  if (userProfile?.role === 'user') {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Sell Your Business</h1>
            <p className={styles.pageSubtitle}>
              List your business and reach thousands of local customers on OfferMe.
            </p>
          </div>

          <div className={styles.promoWrapper}>
            <div className={styles.promoCard}>
              <div className={styles.promoIconWrapper}>
                <span role="img" aria-label="rocket">🚀</span>
              </div>

              <h2 className={styles.promoTitle}>Become a Business Owner</h2>
              <p className={styles.promoDescription}>
                Want to promote your business and publish offers on OfferMe?
                Upgrade to a Business Owner account to unlock powerful tools
                for growing your local presence.
              </p>

              <div className={styles.benefitsGrid}>
                <div className={styles.benefitCard}>
                  <span className={styles.benefitCardIcon} role="img" aria-label="store">🏪</span>
                  <p className={styles.benefitCardTitle}>Publish Your Business</p>
                </div>
                <div className={styles.benefitCard}>
                  <span className={styles.benefitCardIcon} role="img" aria-label="deals">🎉</span>
                  <p className={styles.benefitCardTitle}>Create Offers &amp; Deals</p>
                </div>
                <div className={styles.benefitCard}>
                  <span className={styles.benefitCardIcon} role="img" aria-label="people">👥</span>
                  <p className={styles.benefitCardTitle}>Reach Nearby Customers</p>
                </div>
                <div className={styles.benefitCard}>
                  <span className={styles.benefitCardIcon} role="img" aria-label="megaphone">📣</span>
                  <p className={styles.benefitCardTitle}>Promote to Local Users</p>
                </div>
              </div>

              <div className={styles.promoActions}>
                <a href="/auth/business/register" className={styles.promoPrimaryBtn}>
                  Become a Business Owner →
                </a>
                <button
                  type="button"
                  className={styles.promoSecondaryBtn}
                  onClick={() => navigate('/dashboard')}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Business Owner: Full Form ──────────────────────────────── */

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Sell Your Business</h1>
          <p className={styles.pageSubtitle}>
            List your business and create offers to reach local customers on OfferMe.
          </p>
        </div>

        <div className={styles.contentGrid}>
          {/* ── Left Info Panel ───────────────────────────────── */}
          <div className={styles.infoPanel}>
            <span className={styles.infoEmoji} role="img" aria-label="storefront">
              🏪
            </span>
            <h2 className={styles.infoTitle}>List Your Business in Minutes</h2>
            <p className={styles.infoDescription}>
              Fill out the form to publish your business with an exciting offer.
              Once submitted, our team will review your listing and go live within 24 hours.
            </p>

            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}>✓</span>
                Reach thousands of local customers
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}>✓</span>
                Create deals and discount coupons
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}>✓</span>
                Appear in search and category listings
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}>✓</span>
                Free to list — no hidden charges
              </li>
            </ul>

            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>
                <span role="img" aria-label="info">💡</span> Good to Know
              </h3>
              <p className={styles.infoCardText}>
                Make sure your business details are accurate. Listings with complete
                information and a clear image get approved faster and attract more
                customers.
              </p>
            </div>
          </div>

          {/* ── Right Form Card ──────────────────────────────── */}
          <div className={styles.formCard}>
            <h2 className={styles.formCardTitle}>Business &amp; Offer Details</h2>
            <p className={styles.formCardSubtitle}>
              All fields marked with <span style={{ color: '#ef4444' }}>*</span> are required.
            </p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className={styles.form}
            >
              {/* ── Section: Business Info ────────────────────── */}
              <h3 className={styles.sectionTitle}>Business Information</h3>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="shopName">
                    Shop Name <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="shopName"
                    name="shopName"
                    type="text"
                    placeholder="e.g. Krishna Snacks Corner"
                    value={form.shopName}
                    onChange={handleChange}
                    className={errors.shopName ? styles.fieldError : ''}
                    aria-invalid={!!errors.shopName}
                    aria-describedby={errors.shopName ? 'err-shopName' : undefined}
                  />
                  {errors.shopName && (
                    <span className={styles.fieldError} id="err-shopName" role="alert">
                      <span className={styles.errorIcon}>⚠</span> {errors.shopName}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="businessEmail">
                    Business Email <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    placeholder="e.g. contact@krishnasnacks.com"
                    value={form.businessEmail}
                    onChange={handleChange}
                    className={errors.businessEmail ? styles.fieldError : ''}
                    aria-invalid={!!errors.businessEmail}
                    aria-describedby={errors.businessEmail ? 'err-businessEmail' : undefined}
                  />
                  {errors.businessEmail && (
                    <span className={styles.fieldError} id="err-businessEmail" role="alert">
                      <span className={styles.errorIcon}>⚠</span> {errors.businessEmail}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="businessCategory">
                    Business Category <span className={styles.requiredStar}>*</span>
                  </label>
                  <select
                    id="businessCategory"
                    name="businessCategory"
                    value={form.businessCategory}
                    onChange={handleChange}
                    className={errors.businessCategory ? styles.fieldError : ''}
                    aria-invalid={!!errors.businessCategory}
                    aria-describedby={errors.businessCategory ? 'err-businessCategory' : undefined}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.businessCategory && (
                    <span className={styles.fieldError} id="err-businessCategory" role="alert">
                      <span className={styles.errorIcon}>⚠</span> {errors.businessCategory}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="phoneNumber">
                    Phone Number <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className={errors.phoneNumber ? styles.fieldError : ''}
                    aria-invalid={!!errors.phoneNumber}
                    aria-describedby={errors.phoneNumber ? 'err-phoneNumber' : undefined}
                  />
                  {errors.phoneNumber && (
                    <span className={styles.fieldError} id="err-phoneNumber" role="alert">
                      <span className={styles.errorIcon}>⚠</span> {errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="shopAddress">
                  Shop Address <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="shopAddress"
                  name="shopAddress"
                  type="text"
                  placeholder="e.g. 42 MG Road, Andheri West, Mumbai 400058"
                  value={form.shopAddress}
                  onChange={handleChange}
                  className={errors.shopAddress ? styles.fieldError : ''}
                  aria-invalid={!!errors.shopAddress}
                  aria-describedby={errors.shopAddress ? 'err-shopAddress' : undefined}
                />
                {errors.shopAddress && (
                  <span className={styles.fieldError} id="err-shopAddress" role="alert">
                    <span className={styles.errorIcon}>⚠</span> {errors.shopAddress}
                  </span>
                )}
              </div>

              <hr className={styles.sectionDivider} />

              {/* ── Section: Offer / Deal Details ─────────────── */}
              <h3 className={styles.sectionTitle}>Offer / Deal Details</h3>

              <div className={styles.field}>
                <label htmlFor="dealHeadline">
                  Deal / Offer Headline <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="dealHeadline"
                  name="dealHeadline"
                  type="text"
                  placeholder="e.g. Flat 30% Off on All Snacks This Weekend!"
                  value={form.dealHeadline}
                  onChange={handleChange}
                  className={errors.dealHeadline ? styles.fieldError : ''}
                  aria-invalid={!!errors.dealHeadline}
                  aria-describedby={errors.dealHeadline ? 'err-dealHeadline' : undefined}
                />
                {errors.dealHeadline && (
                  <span className={styles.fieldError} id="err-dealHeadline" role="alert">
                    <span className={styles.errorIcon}>⚠</span> {errors.dealHeadline}
                  </span>
                )}
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="discountPercentage">
                    Discount Percentage (%) <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    placeholder="e.g. 30"
                    value={form.discountPercentage}
                    onChange={handleChange}
                    className={errors.discountPercentage ? styles.fieldError : ''}
                    aria-invalid={!!errors.discountPercentage}
                    aria-describedby={errors.discountPercentage ? 'err-discountPercentage' : undefined}
                  />
                  {errors.discountPercentage && (
                    <span className={styles.fieldError} id="err-discountPercentage" role="alert">
                      <span className={styles.errorIcon}>⚠</span> {errors.discountPercentage}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="couponCode">
                    Custom Coupon Code <span className={styles.optionalTag}>(optional)</span>
                  </label>
                  <input
                    id="couponCode"
                    name="couponCode"
                    type="text"
                    placeholder="e.g. SNACK30"
                    value={form.couponCode}
                    onChange={handleChange}
                    className={errors.couponCode ? styles.fieldError : ''}
                    aria-invalid={!!errors.couponCode}
                    aria-describedby={errors.couponCode ? 'err-couponCode' : undefined}
                  />
                  {errors.couponCode && (
                    <span className={styles.fieldError} id="err-couponCode" role="alert">
                      <span className={styles.errorIcon}>⚠</span> {errors.couponCode}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="originalPrice">
                    Original Price (₹) <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 500"
                    value={form.originalPrice}
                    onChange={handleChange}
                    className={errors.originalPrice ? styles.fieldError : ''}
                    aria-invalid={!!errors.originalPrice}
                    aria-describedby={errors.originalPrice ? 'err-originalPrice' : undefined}
                  />
                  {errors.originalPrice && (
                    <span className={styles.fieldError} id="err-originalPrice" role="alert">
                      <span className={styles.errorIcon}>⚠</span> {errors.originalPrice}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="offerPrice">
                    Offer / Deal Price (₹) <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="offerPrice"
                    name="offerPrice"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 350"
                    value={form.offerPrice}
                    onChange={handleChange}
                    className={errors.offerPrice ? styles.fieldError : ''}
                    aria-invalid={!!errors.offerPrice}
                    aria-describedby={errors.offerPrice ? 'err-offerPrice' : undefined}
                  />
                  {errors.offerPrice && (
                    <span className={styles.fieldError} id="err-offerPrice" role="alert">
                      <span className={styles.errorIcon}>⚠</span> {errors.offerPrice}
                    </span>
                  )}
                </div>
              </div>

              {discountInfo && (
                <div className={styles.discountInfo}>
                  <span className={styles.discountInfoIcon}>💰</span>
                  Your customers save ₹{discountInfo.saved} ({discountInfo.pct}% off) with this deal!
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="expiryDate">
                  Deal Expiry Date <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  min={getTomorrowDateStr()}
                  value={form.expiryDate}
                  onChange={handleChange}
                  className={errors.expiryDate ? styles.fieldError : ''}
                  aria-invalid={!!errors.expiryDate}
                  aria-describedby={errors.expiryDate ? 'err-expiryDate' : undefined}
                />
                {errors.expiryDate && (
                  <span className={styles.fieldError} id="err-expiryDate" role="alert">
                    <span className={styles.errorIcon}>⚠</span> {errors.expiryDate}
                  </span>
                )}
              </div>

              <hr className={styles.sectionDivider} />

              {/* ── Section: Image Upload ─────────────────────── */}
              <h3 className={styles.sectionTitle}>Shop &amp; Offer Image</h3>

              {imagePreview ? (
                <div className={styles.imagePreviewContainer}>
                  <img
                    src={imagePreview}
                    alt="Shop and offer preview"
                    className={styles.imagePreview}
                  />
                  <div className={styles.imagePreviewInfo}>
                    <span>{imageFile?.name}</span>
                    <span>({formatFileSize(imageFile?.size || 0)})</span>
                  </div>
                  <button
                    type="button"
                    className={styles.removeImageBtn}
                    onClick={handleRemoveImage}
                    aria-label="Remove uploaded image"
                  >
                    ✕ Remove Image
                  </button>
                </div>
              ) : (
                <div
                  className={`${styles.imageUploadArea} ${isDragOver ? styles.dragOver : ''} ${errors.image ? styles.hasError : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      fileInputRef.current?.click()
                    }
                  }}
                  aria-label="Upload shop and offer image"
                >
                  <span className={styles.imageUploadIcon} role="img" aria-label="camera">📷</span>
                  <p className={styles.imageUploadText}>
                    <strong>Click to upload</strong> or drag and drop
                  </p>
                  <p className={styles.imageUploadHint}>
                    JPG, JPEG, PNG or WebP — Max 5 MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFileInputChange}
                    className={styles.imageUploadInput}
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                </div>
              )}
              {errors.image && (
                <span className={styles.fieldError} role="alert">
                  <span className={styles.errorIcon}>⚠</span> {errors.image}
                </span>
              )}

              <hr className={styles.sectionDivider} />

              {/* ── Section: Description ──────────────────────── */}
              <h3 className={styles.sectionTitle}>Additional Details</h3>

              <div className={styles.field}>
                <label htmlFor="description">
                  Description <span className={styles.optionalTag}>(optional)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Tell customers more about your business and this offer..."
                  rows={4}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  value={form.description}
                  onChange={handleChange}
                />
                <span
                  className={`${styles.charCount} ${
                    form.description.length >= MAX_DESCRIPTION_LENGTH
                      ? styles.charCountAtLimit
                      : form.description.length >= MAX_DESCRIPTION_LENGTH * 0.9
                        ? styles.charCountNearLimit
                        : ''
                  }`}
                >
                  {form.description.length} / {MAX_DESCRIPTION_LENGTH}
                </span>
              </div>

              {/* ── Submit ────────────────────────────────────── */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  'Submit Listing'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Success Overlay ──────────────────────────────────── */}
      {submitted && (
        <div
          className={styles.successOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Submission successful"
        >
          <div className={styles.successCard}>
            <span className={styles.successEmoji} role="img" aria-label="celebration">
              🎉
            </span>
            <h2 className={styles.successTitle}>Listing Submitted!</h2>
            <p className={styles.successMessage}>
              Your business listing has been received successfully.
              Our team will review it and your listing will go live within 24 hours.
            </p>
            <p className={styles.successNote}>
              Backend / API integration will be connected soon. No data has been stored on a server yet.
            </p>
            <button
              type="button"
              className={styles.successBtn}
              onClick={() => navigate('/business/dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
