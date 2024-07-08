import { useEffect } from "react"
import "./styles/filter.css"
export const Filter = ({ allProductsArr, setFiltered, activeCat, setActiveCat, categories }) => {
    useEffect(() => {
        if (activeCat === 0) {
            setFiltered(allProductsArr);
            return;
        }
        const filtered = allProductsArr.filter((prod) => prod.category._id === activeCat)
        setFiltered(filtered);
        console.log(filtered);
    }, [activeCat])
    
    return (
        <div className="filter-container">
            <button className={activeCat === 0 ? "active my-2" : "my-2"} onClick={() => setActiveCat(0)}>All</button>
            {categories.map((cat) => {
                return (
                    <button className={activeCat === cat._id ? "active my-2" : "my-2"} onClick={() => setActiveCat(cat._id)}>{cat.name}</button>
                )

            })}
            
           
        </div>
    )
}
