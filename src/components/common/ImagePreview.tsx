interface Props {
    src?: string;
    }
    
    
    const ImagePreview = ({ src }: Props) => {
    if (!src) return null;
    return <img src={src} className="h-32 object-cover rounded" />;
    };
    
    
    export default ImagePreview;