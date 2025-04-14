import { browser } from '$app/environment';

export function useMobileView() {
    // let sm = false;
    // let md = false;
    // let lg = false;

    let mediaWidth: "sm" | "md" | "lg" | "xl" = "lg";

    function getMediaWidth() {
        if (window.innerWidth < 768) {
            mediaWidth = "sm";
        } else if (window.innerWidth < 992) {
            mediaWidth = "md";
        } else if (window.innerWidth < 1200) {
            mediaWidth = "lg"
        } else {
            mediaWidth = "xl";
        }
    }

    if(browser) {
        getMediaWidth();
    }

    // if (browser) {
    //     sm = window.innerWidth <= 768;
    //     md = window.innerWidth <= 992 && window.innerWidth > 768;
    //     lg = window.innerWidth <= 1200 && window.innerWidth > 992;
    // }

    // if(isMobileView) {
    //     console.log("True")
    // } else {
    //     console.log("False")
    // }

    return { mediaWidth };
}