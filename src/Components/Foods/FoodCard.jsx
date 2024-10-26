import axios from "axios";
import { useEffect, useState } from "react";

const FoodCard = () => {
    const [foodData, setFoodData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`data.json`);
                setFoodData(res.data);
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {foodData.map((food) => (
                <div key={food.id} className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img src={food.image} alt={food.name} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {food.name}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>{food.description}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Price: ${food.price}</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default FoodCard;
