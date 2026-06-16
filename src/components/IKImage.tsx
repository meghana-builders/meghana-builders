import { useState, useEffect } from "react";
import { ikUrl, type ImageKitTransformations } from "@/lib/imagekit";

interface IKImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  path: string;
  transformation?: ImageKitTransformations;
  lqip?: boolean;
}

/**
 * A progressive, optimized ImageKit image component.
 * It serves optimized formats, handles lazy-loading, and uses a blur-up placeholder (LQIP)
 * to transition smoothly to the high-res image.
 */
export function IKImage({ 
  path, 
  transformation, 
  lqip = true, 
  className = "", 
  alt = "", 
  ...props 
}: IKImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");

  useEffect(() => {
    // Generate high-resolution URL
    const highResUrl = ikUrl(path, transformation);

    if (!lqip) {
      setCurrentSrc(highResUrl);
      setLoaded(true);
      return;
    }

    // Generate low-quality placeholder (tiny width + blur parameter)
    const lqipUrl = ikUrl(path, { ...transformation, width: 20, blur: 5, quality: 15 });
    setCurrentSrc(lqipUrl);
    setLoaded(false);

    // Preload high-res image in memory
    const img = new Image();
    img.src = highResUrl;
    img.onload = () => {
      setCurrentSrc(highResUrl);
      setLoaded(true);
    };
  }, [path, transformation, lqip]);

  // CSS transition styles for premium progressive blur-up effect
  const filterStyle = lqip && !loaded ? "blur(10px) scale(1.03)" : "blur(0) scale(1)";
  const transitionStyle = "filter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={props.loading || "lazy"}
      style={{
        filter: filterStyle,
        transition: transitionStyle,
        ...props.style
      }}
      className={className}
      {...props}
    />
  );
}
export default IKImage;
