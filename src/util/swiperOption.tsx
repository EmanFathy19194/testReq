import { Autoplay, Navigation, Pagination } from "swiper/modules"
import {SwiperModule} from "swiper/types";

interface SwiperConfig {
	modules: SwiperModule[]; // Correct type for modules
	spaceBetween: number;
	slidesPerView: number | "auto";
	slidesPerGroup: number;
	loop: boolean;
	speed?: number;
	centeredSlides?: boolean;
	paginationClickable?: boolean;
	slideToClickedSlide?: boolean;
	watchOverflow?: boolean;
	navigation: {
		nextEl: string;
		prevEl: string;
	};
	autoplay: {
		delay: number;
	};
	pagination?: {
		el: string;
		clickable: boolean;
	};
	breakpoints?: {
		[key: number]: {
			slidesPerView: number | "auto";
			slidesPerGroup?: number;
			spaceBetween?: number;
		};
	};
}

// Example of the swiperGroup configuration
export const swiperGroup8: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation], // No type error now
	slidesPerView: 8,
	spaceBetween: 10,
	slidesPerGroup: 1,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next-group-8",
		prevEl: ".swiper-button-prev-group-8"
	},
	autoplay: {
		delay: 10000
	},
	breakpoints: {
		1399: {
			slidesPerView: 8
		},
		1199: {
			slidesPerView: 6
		},
		992: {
			slidesPerView: 5
		},
		800: {
			slidesPerView: 4
		},
		650: {
			slidesPerView: 4
		},
		400: {
			slidesPerView: 2
		},
		250: {
			slidesPerView: 2,
			slidesPerGroup: 1,
			spaceBetween: 15
		}
	}
};
export const swiperGroupAnimate: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation], // Required modules
	spaceBetween: 24, // Space between slides
	slidesPerView: "auto", // Automatically set the number of slides per view
	slidesPerGroup: 1, // Number of slides to move at once
	loop: true, // Infinite loop
	speed: 1000, // Transition speed (in milliseconds)
	navigation: {
		nextEl: ".swiper-button-next-animate", // Next button selector
		prevEl: ".swiper-button-prev-animate" // Previous button selector
	},
	autoplay: {
		delay: 10000, // Delay between auto slides
	},
	breakpoints: {
		1199: {
			slidesPerView: "auto" // Keep auto for large screens
		},
		600: {
			slidesPerView: "auto" // Keep auto for medium screens
		},
		575: {
			slidesPerView: 1 // Show 1 slide at a time on smaller screens
		},
		350: {
			slidesPerView: 1 // Show 1 slide at a time on very small screens
		}
	}
};
export const swiperGroup3: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation],
	spaceBetween: 30,
	slidesPerView: 3,
	slidesPerGroup: 1,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next-3",
		prevEl: ".swiper-button-prev-3"
	},
	autoplay: {
		delay: 10000
	},
	breakpoints: {
		1199: {
			slidesPerView: 3
		},
		800: {
			slidesPerView: 2
		},
		400: {
			slidesPerView: 1
		},
		250: {
			slidesPerView: 1
		}
	}
}



export const swiperGroup6: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation],
	spaceBetween: 30,
	slidesPerView: 6,
	slidesPerGroup: 2,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},
	autoplay: {
		delay: 10000
	},
	breakpoints: {
		1599: {
			slidesPerView: 6
		},
		1499: {
			slidesPerView: 5
		},
		1299: {
			slidesPerView: 4
		},
		800: {
			slidesPerView: 3
		},
		400: {
			slidesPerView: 2
		},
		350: {
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 15
		}
	}
}

export const swiperGroup1: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	spaceBetween: 50,
	slidesPerGroup: 1,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next-group-1",
		prevEl: ".swiper-button-prev-group-1"
	},
	pagination: {
		el: ".swiper-pagination-group-1",
		clickable: true
	},
	autoplay: {
		delay: 100000
	}
}

export const swiperGroupPayment: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation],
	spaceBetween: 10,
	slidesPerView: 4,
	slidesPerGroup: 1,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next-payment",
		prevEl: ".swiper-button-prev-payment"
	},
	autoplay: {
		delay: 5000
	},
	breakpoints: {
		1199: {
			slidesPerView: 4
		},
		800: {
			slidesPerView: 4
		},
		500: {
			slidesPerView: 4
		},
		350: {
			slidesPerView: 3
		},
		320: {
			slidesPerView: 2
		},
		250: {
			slidesPerView: 2
		}
	}
}
export const swiperGroupPayment9: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation],
	spaceBetween: 20,
	slidesPerView: 9,
	slidesPerGroup: 1,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next-payment",
		prevEl: ".swiper-button-prev-payment"
	},
	autoplay: {
		delay: 5000
	},
	breakpoints: {
		1199: {
			slidesPerView: 9
		},
		800: {
			slidesPerView: 7
		},
		650: {
			slidesPerView: 6
		},
		575: {
			slidesPerView: 5
		},
		450: {
			slidesPerView: 3
		},
		320: {
			slidesPerView: 3
		},
		250: {
			slidesPerView: 2
		}
	}
}
export const swiperGroupPayment10: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation],
	spaceBetween: 20,
	slidesPerView: 10,
	slidesPerGroup: 2,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next-payment",
		prevEl: ".swiper-button-prev-payment"
	},
	autoplay: {
		delay: 5000
	},
	breakpoints: {
		1199: {
			slidesPerView: 10
		},
		800: {
			slidesPerView: 8
		},
		650: {
			slidesPerView: 6
		},
		575: {
			slidesPerView: 5
		},
		450: {
			slidesPerView: 3
		},
		320: {
			slidesPerView: 3
		},
		250: {
			slidesPerView: 2
		}
	}
}
export const swiperGroupPayment7: SwiperConfig = {
	modules: [Autoplay, Pagination, Navigation],
	spaceBetween: 20,
	slidesPerView: 7,
	slidesPerGroup: 1,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next-payment",
		prevEl: ".swiper-button-prev-payment"
	},
	autoplay: {
		delay: 5000
	},
	breakpoints: {
		1199: {
			slidesPerView: 7
		},
		800: {
			slidesPerView: 6
		},
		650: {
			slidesPerView: 5
		},
		575: {
			slidesPerView: 4
		},
		450: {
			slidesPerView: 3
		},
		320: {
			slidesPerView: 3
		},
		250: {
			slidesPerView: 2
		}
	}
}
