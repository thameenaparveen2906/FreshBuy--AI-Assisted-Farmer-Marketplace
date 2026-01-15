import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllProducts,
  getFeaturedProducts,
  toSnakeCase,
} from "@/lib/services";
import { IProduct } from "@/types/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

// Categories List
const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Grains",
  "Cereals",
  "Pulses",
  "Spices",
  "Herbs",
  "Dairy",
  "Oils",
];


// Simple shimmer skeleton card
const SkeletonCard = () => (
  <motion.div
    className="bg-muted rounded-xl h-64 animate-pulse"
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
  />
);

const StorePage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [featuredProductsLoader, setFeaturedProductsLoader] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);

  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [loadingAllProducts, setLoadingAllProducts] = useState(true);

  /** Fetch All Products **/
  useEffect(() => {
    async function handleGetAllProducts() {
      setLoadingAllProducts(true);
      try {
        const res = await getAllProducts(
          page,
          searchQuery,
          toSnakeCase(selectedCategory)
        );
        setProducts(res.results);
        setNextPage(res.next);
        setPrevPage(res.previous);
        setCount(res.count);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingAllProducts(false);
      }
    }

    handleGetAllProducts();
  }, [page, searchQuery, selectedCategory]);

  /** Fetch Featured Products **/
  useEffect(() => {
    async function handleGetFeaturedProducts() {
      setFeaturedProductsLoader(true);
      try {
        const res = await getFeaturedProducts();
        setFeaturedProducts(res);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching featured products:", err.message);
        }
      } finally {
        setFeaturedProductsLoader(false);
      }
    }

    handleGetFeaturedProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | FreshBuy</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          {!searchQuery && (
             <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/85 p-8 md:p-14 shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                
                  <div className="max-w-xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 text-primary-foreground">
                      Fresh Produce,
                      <br />
                      Straight From Farms
                    </h1>

                    <p className="text-lg md:text-2xl mb-8 text-primary-foreground/90">
                      Support farmers and enjoy farm-fresh vegetables, fruits, and grains —
                      harvested and delivered with care.
                    </p>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-primary font-semibold hover:bg-white/90 shadow-md"
                      onClick={() =>
                        document
                          .getElementById("all-products")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Shop Fresh
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <img
                    src="/image.png"
                    alt="Farmers market illustration"
                    className="max-w-full h-auto drop-shadow-xl"
                  />
                </div>

              </div>
            </div>
          </section>
          )}

          {/* Search Results Header */}
          {searchQuery && (
            <section className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-muted-foreground">{count} products found</p>
            </section>
          )}

          {/* Featured Products */}
          {!searchQuery && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

              {featuredProductsLoader ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                featuredProducts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )
              )}
            </section>
          )}

          {/* Category Filters */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </section>

          {/* Products Grid */}
          <section id="all-products">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h2>
              <Badge variant="secondary" className="px-3 py-1">
                {count} products
              </Badge>
            </div>

            {loadingAllProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All");
                    window.history.pushState({}, "", "/");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <Button
              variant="outline"
              disabled={!prevPage}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Button>

            <span className="text-sm">Page {page}</span>

            <Button
              variant="outline"
              disabled={!nextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StorePage;
