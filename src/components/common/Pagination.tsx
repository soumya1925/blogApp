interface Props {
    total: number;
    perPage: number;
    page: number;
    setPage: (p: number) => void;
    }
    
    
    const Pagination = ({ total, perPage, page, setPage }: Props) => {
    const pages = Math.ceil(total / perPage);
    return (
    <div className="flex gap-2 mt-4">
    {Array.from({ length: pages }, (_, i) => (
    <button key={i} onClick={() => setPage(i + 1)}
    className={`px-3 py-1 border ${page === i + 1 && 'bg-blue-600 text-white'}`}
    >{i + 1}</button>
    ))}
    </div>
    );
    };
    
    
    export default Pagination;