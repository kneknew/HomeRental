import Image from 'next/image';

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
                {/* Beach */}
                <div 
                    onClick={() => setCategory('beach')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory === 'beach' ? 'border-gray-800' : 'border-white'
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_beach.jpeg"
                        alt="Category - Beach"
                        width={20}
                        height={20}
                    />
                    <span className='text-xs'>Beach</span>
                </div>

                {/* Villas */}
                <div 
                    onClick={() => setCategory('villas')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory === 'villas' ? 'border-gray-800' : 'border-white'
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_beach.jpeg"
                        alt="Category - Villas"
                        width={20}
                        height={20}
                    />
                    <span className='text-xs'>Villas</span>
                </div>

                {/* Cabins */}
                <div 
                    onClick={() => setCategory('cabins')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory === 'cabins' ? 'border-gray-800' : 'border-white'
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_beach.jpeg"
                        alt="Category - Cabins"
                        width={20}
                        height={20}
                    />
                    <span className='text-xs'>Cabins</span>
                </div>

                {/* Tiny Homes */}
                <div 
                    onClick={() => setCategory('tiny_homes')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory === 'tiny_homes' ? 'border-gray-800' : 'border-white'
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_beach.jpeg"
                        alt="Category - Tiny Homes"
                        width={20}
                        height={20}
                    />
                    <span className='text-xs'>Tiny Homes</span>
                </div>
            </div>
        </>
    );
};

export default Categories;
