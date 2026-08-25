import React from "react";
import ShopCard from "./ShopCard";
import EmptyState from "../common/EmptyState";

export const ShopGrid = ({ shops, onResetFilters }) => {
  if (!shops || shops.length === 0) {
    return (
      <EmptyState
        title="No local shops found"
        message="We couldn't find any matching shops in Kattupakkam or Iyyappanthangal with your selected filters."
        onReset={onResetFilters}
        resetText="Reset Filters"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {shops.map(shop => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
};

export default ShopGrid;
