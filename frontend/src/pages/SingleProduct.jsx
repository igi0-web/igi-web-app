import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export const SingleProduct = () => {


    const params = useParams();
    const [product, setProduct] = useState({});



    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {

                const res = await fetch(`/api/products/${params.id}`);
                const data = await res.json();
                if (data.success === false) {

                    return;
                }
                setProduct(data);
                console.log(data);

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchSingleProduct();

    }, [params.id]);

    return (
        <>
            <section id="news" class="container">
                <div style={{ width: "70%", marginLeft: "15%", marginTop: "1%" }}>
                    <div class="row text-center mt-5">
                        <div class="">
                            <h2 class="section-p font-weight-bold mb-2">{product.name}</h2>
                        </div>
                    </div>
                </div>
                <div class="row mx-auto">
                    <div class="ratio ratio-21x9 mt-3 col-12">
                        <img src={`${product.imageUrl}`} class="img-fluid object-fit-contain rounded" alt="" />
                    </div>
                </div>


                <h6 className='section-p mt-2 font-weight-bold'></h6>

                <p className='section-p'>
                    {product.desc}
                </p>



                <div class="row mt-4 ">
                    <div class="accordion col-12" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <strong>Code</strong>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>{product.code}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <strong>Description</strong>
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>{product.description}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <strong>Features</strong>
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>{product.features}</strong>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <a href="/products" class=" btn desiredBtn w-100">Other Products</a>
                    </div>

                </div>
            </section >

        </>
    )
}
