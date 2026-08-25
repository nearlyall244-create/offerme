import React, { useState, useRef } from 'react';
import { Offer, LocationCoords } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  LocateFixed, 
  Store, 
  X, 
  ExternalLink, 
  Sparkles,
  Layers
} from 'lucide-react';
import './GoogleMapViewer.css';

interface GoogleMapViewerProps {
  offers?: Offer[];
  compact?: boolean;
  pickerMode?: boolean;
  selectedCoords?: LocationCoords | null;
  onSelectCoords?: (coords: LocationCoords) => void;
  onOfferSelect?: (offer: Offer) => void;
}

export const GoogleMapViewer: React.FC<GoogleMapViewerProps> = ({
  offers = [],
  compact = false,
  pickerMode = false,
  selectedCoords,
  onSelectCoords,
  onOfferSelect
}) => {
  const { userCoords, requestUserLocation, setSelectedOffer, recordView } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [pickedPoint, setPickedPoint] = useState<{ x: number; y: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Map viewport center around San Francisco base
  const centerLat = 37.7749;
  const centerLng = -122.4194;

  const latLngToPercent = (lat: number, lng: number) => {
    // Normalizing SF coords to 10% - 90% boundary with zoom scaling
    const latSpan = 0.08;
    const lngSpan = 0.08;
    const y = 50 - ((lat - centerLat) / latSpan) * 45 * zoomLevel;
    const x = 50 + ((lng - centerLng) / lngSpan) * 45 * zoomLevel;
    return {
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(8, Math.min(92, y))
    };
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pickerMode || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPickedPoint({ x, y });

    // Derive lat/lng from click
    const derivedLat = centerLat + ((50 - y) / (45 * zoomLevel)) * 0.08;
    const derivedLng = centerLng + ((x - 50) / (45 * zoomLevel)) * 0.08;

    if (onSelectCoords) {
      onSelectCoords({
        lat: parseFloat(derivedLat.toFixed(5)),
        lng: parseFloat(derivedLng.toFixed(5)),
        city: 'San Francisco, CA'
      });
    }
  };

  const handleOfferClick = (offer: Offer) => {
    setActiveOffer(offer);
    recordView(offer.id);
  };

  return (
    <div
      id="google-maps-interactive-viewer"
      className={`map-viewer-wrapper ${compact ? 'compact' : ''}`}
    >
      <div
        ref={mapRef}
        className="map-canvas-container"
        onClick={handleMapClick}
        style={{ cursor: pickerMode ? 'crosshair' : 'grab' }}
      >
        <div className="map-grid-layer" />

        {/* Decorative Roads / Map Blocks */}
        <div className="map-roads-layer">
          <div className="map-road-line" style={{ top: '40%', left: '0%', width: '100%', height: '14px', transform: 'rotate(-4deg)' }} />
          <div className="map-road-line" style={{ top: '65%', left: '0%', width: '100%', height: '12px', transform: 'rotate(2deg)' }} />
          <div className="map-road-line" style={{ top: '0%', left: '35%', width: '14px', height: '100%', transform: 'rotate(5deg)' }} />
          <div className="map-road-line" style={{ top: '0%', left: '70%', width: '12px', height: '100%', transform: 'rotate(-3deg)' }} />
          
          {/* Waterfront / Park aesthetic blocks */}
          <div style={{ position: 'absolute', top: '0', right: '0', width: '22%', height: '40%', background: '#dbeafe', borderBottomLeftRadius: '40px', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '15%', width: '18%', height: '22%', background: '#dcfce7', borderRadius: '16px', opacity: 0.7 }} />
        </div>

        {/* Picker Mode Instruction Banner */}
        {pickerMode && (
          <div className="map-picker-banner">
            <MapPin size={15} className="text-rose-400" />
            <span>Click anywhere on the map to pin your shop location</span>
          </div>
        )}

        {/* User's GPS Location Marker */}
        {userCoords && (
          <div
            className="user-current-pin"
            style={{
              left: `${latLngToPercent(userCoords.lat, userCoords.lng).x}%`,
              top: `${latLngToPercent(userCoords.lat, userCoords.lng).y}%`
            }}
            title="Your Location"
          >
            <div className="user-pulse-ring" />
            <div className="user-dot" />
          </div>
        )}

        {/* Shop Offer Pin Markers */}
        {!pickerMode &&
          offers.map((offer) => {
            const { x, y } = latLngToPercent(offer.coordinates.lat, offer.coordinates.lng);
            const isActive = activeOffer?.id === offer.id;

            return (
              <div
                key={offer.id}
                id={`map-pin-${offer.id}`}
                className={`map-pin-marker ${isActive ? 'active' : ''}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOfferClick(offer);
                }}
              >
                <div
                  className="pin-bubble"
                  style={{
                    backgroundColor: isActive ? '#0f172a' : '#e11d48'
                  }}
                >
                  <Store size={11} />
                  <span>{offer.discountPercent}% OFF</span>
                </div>
                <div
                  className="pin-point"
                  style={{
                    borderTopColor: isActive ? '#0f172a' : '#e11d48'
                  }}
                />
              </div>
            );
          })}

        {/* Selected coordinates marker in picker mode */}
        {pickerMode && (pickedPoint || selectedCoords) && (
          <div
            className="map-pin-marker active"
            style={{
              left: pickedPoint ? `${pickedPoint.x}%` : selectedCoords ? `${latLngToPercent(selectedCoords.lat, selectedCoords.lng).x}%` : '50%',
              top: pickedPoint ? `${pickedPoint.y}%` : selectedCoords ? `${latLngToPercent(selectedCoords.lat, selectedCoords.lng).y}%` : '50%'
            }}
          >
            <div className="pin-bubble" style={{ background: '#0f172a' }}>
              <MapPin size={12} className="text-rose-400" />
              <span>Shop Pin Set</span>
            </div>
            <div className="pin-point" style={{ borderTopColor: '#0f172a' }} />
          </div>
        )}

        {/* Controls Overlay */}
        <div className="map-controls-panel">
          <button
            id="map-zoom-in-btn"
            type="button"
            className="map-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
            }}
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            id="map-zoom-out-btn"
            type="button"
            className="map-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
            }}
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            id="map-locate-me-btn"
            type="button"
            className="map-control-btn text-rose-600"
            onClick={(e) => {
              e.stopPropagation();
              requestUserLocation();
            }}
            title="Center to My GPS Location"
          >
            <LocateFixed size={16} />
          </button>
        </div>

        {/* Active Shop Popup Card */}
        {activeOffer && !pickerMode && (
          <div className="map-popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded">
                  {activeOffer.discountPercent}% OFF
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeOffer.category}
                </span>
              </div>
              <button
                onClick={() => setActiveOffer(null)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
              >
                <X size={15} />
              </button>
            </div>

            <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
              {activeOffer.title}
            </h4>
            <p className="text-xs text-slate-600 flex items-center gap-1 mb-3">
              <Store size={12} className="text-slate-400" />
              <strong>{activeOffer.shopName}</strong> &bull; {activeOffer.shopAddress}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800">
                {activeOffer.offerPrice ? `$${activeOffer.offerPrice}` : `Code: ${activeOffer.couponCode}`}
              </div>
              <button
                id={`map-popup-view-btn-${activeOffer.id}`}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                onClick={() => {
                  if (onOfferSelect) onOfferSelect(activeOffer);
                  else setSelectedOffer(activeOffer);
                }}
              >
                <span>View Details</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
