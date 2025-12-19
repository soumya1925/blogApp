interface Props {
    onSearch: (value: string) => void;
    }
    
    
    const BlogFilters = ({ onSearch }: Props) => {
    return (
    <input
    className="border p-2 w-full md:w-1/3"
    placeholder="Search blog"
    onChange={e => onSearch(e.target.value)}
    />
    );
    };
    
    
    export default BlogFilters;