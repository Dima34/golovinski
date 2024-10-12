
    const responsiveMenu = document.querySelector(".header_mobile-nav");
    const menuBtn = document.querySelector(".header_menu-opener");
    const responsiveMenuLinks = document.querySelectorAll(".header_mobile-nav li>a");
    const responsiveMenuNums = document.querySelectorAll(".header_mobile-nav li>span");
    const tl = gsap.timeline();


    tl.to(responsiveMenu, {
        ease: "circ.inOut",
        duration: 1.4,
        right: "0%"
    });
    tl.from(responsiveMenuLinks, {
        transform: "translateY(120%)",
        stagger: 0.1
    });
    tl.from(responsiveMenuNums, {
        transform: "translateY(-120%)",
        stagger: 0.1
    });

    tl.pause();
    menuBtn.addEventListener("click", () => {
        if (Array.from(menuBtn.classList).includes("is-active")) {
            menuBtn.classList.remove("is-active");
            tl.reverse();
            document.body.classList.remove("scroll-block");
        } else {
            menuBtn.classList.add("is-active");
            tl.play();
            document.body.classList.add("scroll-block");
        }
    });
