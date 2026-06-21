import { getStrapiMedia } from "#/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
    images: { url: string }[]
    selectedImage: number
    onImageSelect: (index: number) => void
}

export default function ProductGallery({ images, selectedImage, onImageSelect }: ProductGalleryProps) {

    const handlePrev = () => {
        onImageSelect(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }

    const handleNext = () => {
        onImageSelect(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-3/4 bg-card rounded-lg overflow-hidden group">
                <img
                    src={getStrapiMedia(images[selectedImage].url)}
                    alt={`${images[selectedImage].url}`}
                    className="w-full h-full object-cover object-center"
                />

                {/* Navigation Arrows */}
                <button
                    aria-label="imagineaa anterioara"
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    aria-label="imagineaa urmatoare"

                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => onImageSelect(index)}
                        className={`w-16 h-20 rounded-md overflow-hidden transition ${selectedImage === index ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                            }`}
                    >
                        <img
                            src={getStrapiMedia(image.url)}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
