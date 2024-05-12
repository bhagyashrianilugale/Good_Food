import ItemCard from "./ItemCard";

const RestaurantCategory = ({data, showItem, setShowIndex})=>{

    const handleClick = () =>{
          setShowIndex();
    }

    return (
        <div>
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 cursor-pointer">
                <div className=" flex justify-between font-bold" onClick={ handleClick }>
                     <span>{data.title}({data?.itemCards?.length})</span>
                     <span>⬇️</span>
                </div>
                {showItem && <ItemCard items={data.itemCards}/>}
            </div>
        </div>
    )
};

export default RestaurantCategory;