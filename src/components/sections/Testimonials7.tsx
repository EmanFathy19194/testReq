'use client'
import { swiperGroup1 } from "@/util/swiperOption"
import { Swiper, SwiperSlide } from "swiper/react"

export default function Testimonials7() {
    return (
        <>
            <section className="section-box box-testimonials-2 box-testimonials-6 background-body">
                <div className="container">
                    <div className="text-center wow fadeInUp">
                        <div className="d-flex justify-content-center">
                            <div className="box-author-testimonials">
                                <img src="/assets/imgs/page/homepage1/testimonial.png" alt="Travila" />
                                <img src="/assets/imgs/page/homepage1/testimonial2.png" alt="Travila" />
                                <img src="/assets/imgs/page/homepage1/testimonial3.png" alt="Travila" />
                                Testimonials
                            </div>
                        </div>
                        <h4 className="mt-8 mb-5 neutral-1000">What Our Clients Say</h4>
                    </div>
                    <div className="box-img-test-1">
                        <img src="/assets/imgs/page/homepage10/img-test.png" alt="Travila" />
                    </div>
                    <div className="box-img-test-2">
                        <img src="/assets/imgs/page/homepage10/img-test2.png" alt="Travila" />
                    </div>
                    <div className="box-img-test-3">
                        <img src="/assets/imgs/page/homepage10/img-test3.png" alt="Travila" />
                    </div>
                    <div className="box-img-test-4">
                        <img src="/assets/imgs/page/homepage10/img-test4.png" alt="Travila" />
                    </div>
                    <div className="row align-items-center wow fadeInUp">
                        <div className="col-lg-8 offset-lg-2 mb-30">
                            <div className="box-swiper">
                                <div className="swiper-container swiper-group-1 swiper-group-journey pb-0">
                                    <Swiper {...swiperGroup1}>
                                        <SwiperSlide>
                                            <div className="card-testimonial card-testimonial-2">
                                                <div className="card-top">
                                                    <div className="card-author">
                                                        <div className="card-image">
                                                            <img src="/assets/imgs/page/homepage1/author.png" alt="Travila" />
                                                        </div>
                                                        <div className="card-info">
                                                            <p className="text-lg-bold neutral-1000">Lorem Ipsum</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-rate">
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                    </div>
                                                </div>
                                                <div className="card-info">
                                                    <p className="neutral-1000 text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at commodo libero. Etiam in velit et arcu varius pretium non nec tellus.</p>
                                                </div>
                                                <div className="card-bottom">
                                                    <p className="text-sm-bold neutral-1000">--- Lorem Ipsum ---</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="card-testimonial card-testimonial-2">
                                                <div className="card-top">
                                                    <div className="card-author">
                                                        <div className="card-image">
                                                            <img src="/assets/imgs/page/homepage1/author2.png" alt="Travila" />
                                                        </div>
                                                        <div className="card-info">
                                                            <p className="text-lg-bold neutral-1000">Dolor Sit</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-rate">
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                    </div>
                                                </div>
                                                <div className="card-info">
                                                    <p className="neutral-1000 text-md">Nulla facilisi. Curabitur feugiat dignissim magna, non rhoncus metus facilisis vel. Proin tempor ipsum non elit viverra, vitae luctus orci vulputate.</p>
                                                </div>
                                                <div className="card-bottom">
                                                    <p className="text-sm-bold neutral-1000">--- Consectetur ---</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="card-testimonial card-testimonial-2">
                                                <div className="card-top">
                                                    <div className="card-author">
                                                        <div className="card-image">
                                                            <img src="/assets/imgs/page/homepage1/author.png" alt="Travila" />
                                                        </div>
                                                        <div className="card-info">
                                                            <p className="text-lg-bold neutral-1000">Amet Consectetur</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-rate">
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                    </div>
                                                </div>
                                                <div className="card-info">
                                                    <p className="neutral-1000 text-md">Praesent vel sem id mauris pretium varius. Suspendisse eget erat ac orci pulvinar interdum at nec libero.</p>
                                                </div>
                                                <div className="card-bottom">
                                                    <p className="text-sm-bold neutral-1000">--- Adipiscing Elit ---</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="card-testimonial card-testimonial-2">
                                                <div className="card-top">
                                                    <div className="card-author">
                                                        <div className="card-image">
                                                            <img src="/assets/imgs/page/homepage1/author2.png" alt="Travila" />
                                                        </div>
                                                        <div className="card-info">
                                                            <p className="text-lg-bold neutral-1000">Lorem Ipsum</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-rate">
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                        <img src="/assets/imgs/template/icons/star.svg" alt="Travila" />
                                                    </div>
                                                </div>
                                                <div className="card-info">
                                                    <p className="neutral-1000 text-md">Sed ac malesuada velit. Integer feugiat elit sed nunc efficitur, a gravida risus fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
                                                </div>
                                                <div className="card-bottom">
                                                    <p className="text-sm-bold neutral-1000">--- Sed Gravida ---</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="swiper-pagination swiper-pagination-group-1 swiper-pagination-style-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
