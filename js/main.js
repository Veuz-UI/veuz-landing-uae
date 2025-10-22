/**
 *
 * preloader
 * headerSticky
 * footer
 * changeValue
 * video
 * infiniteScroll
 * textRotate
 * counter
 * progresslevel
 * totalNumberVariant
 * deleteFile
 * datePicker
 * autoPopup
 * ajaxContactForm
 * handleSidebarFilter
 * checkPaymentCard
 * handleAccordionBorders
 * togglePassword
 * parallaxImage
 * goTop
 * preloader
 *
 **/

(function ($) {
    ("use strict");

    var headerSticky = function () {
    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $(".header-sticky").outerHeight();
    let didScroll = false;

    $(window).scroll(function () {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            let st = $(window).scrollTop();
            navbarHeight = $(".header-sticky").outerHeight();

            // ഹെഡറിൻ്റെ ഉയരത്തേക്കാൾ കൂടുതൽ സ്ക്രോൾ ചെയ്യുമ്പോൾ മാത്രം സ്റ്റൈലുകൾ മാറ്റുന്നു
            if (st > navbarHeight) {
                
                // ⚠️ പ്രധാന മാറ്റം ഇവിടെ: താഴേക്ക് സ്ക്രോൾ ചെയ്യുമ്പോൾ ഹെഡറിനെ ഒളിപ്പിക്കരുത് (top: 0 ആയി നിലനിർത്തുക)
                // if (st > lastScrollTop + delta) {
                //     $(".header-sticky").css("top", `-${navbarHeight}px`); // ഈ ലൈൻ ഒഴിവാക്കുന്നു
                // } 
                
                // മുകളിലേക്ക് സ്ക്രോൾ ചെയ്യുമ്പോഴും, താഴേക്ക് സ്ക്രോൾ ചെയ്യുമ്പോഴും ഹെഡർ കാണിക്കണം
                // top: 0 എന്നതും, header-bg ക്ലാസ്സും എപ്പോഴും ചേർക്കുക
                $(".header-sticky").css("top", "0");
                $(".header-sticky").addClass("header-bg");
                
            } else {
                // പേജിൻ്റെ മുകളിൽത്തന്നെയാണെങ്കിൽ (ഹെഡർ ഉയരത്തേക്കാൾ കുറഞ്ഞ സ്ക്രോൾ)
                $(".header-sticky").css("top", "unset");
                $(".header-sticky").removeClass("header-bg");
            }

            lastScrollTop = st;
            didScroll = false;
        }
    }, 250);
};

// ⚠️ jQuery-യിൽ ഈ ഫംഗ്ഷൻ വിളിക്കാൻ മറക്കരുത്
// $(document).ready(function() {
//     headerSticky();
// });

    var footer = function () {
        function checkScreenSize() {
            if (window.matchMedia("(max-width: 550px)").matches) {
                $(".tf-collapse-content").css("display", "none");
            } else {
                $(".footer-menu-list").siblings().removeClass("open");
                $(".tf-collapse-content").css("display", "unset");
            }
        }
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        var args = { duration: 250 };
        $(".title-mobile").on("click", function () {
            $(this).parent(".footer-col-block").toggleClass("open");
            if (!$(this).parent(".footer-col-block").is(".open")) {
                $(this).next().slideUp(args);
            } else {
                $(this).next().slideDown(args);
            }
        });
    };

    var changeValue = function () {
        if ($(".tf-dropdown-sort").length > 0) {
            $(".select-item").click(function (event) {
                $(this)
                    .closest(".tf-dropdown-sort")
                    .find(".text-sort-value")
                    .text($(this).find(".text-value-item").text());

                $(this)
                    .closest(".dropdown-menu")
                    .find(".select-item.active")
                    .removeClass("active");

                $(this).addClass("active");

                var color = $(this).data("value-color");
                $(this)
                    .closest(".tf-dropdown-sort")
                    .find(".btn-select")
                    .find(".current-color")
                    .css("background", color);
            });
        }
    };

    var video = function () {
        if (
            $("div").hasClass("wg-video") ||
            $("div").hasClass("post-format-video")
        ) {
            $(".popup-youtube, .wg-curve-text-video").magnificPopup({
                type: "iframe",
            });
        }
    };

    var infiniteScroll = function () {
        if ($("body").hasClass("loadmore")) {
            $(".fl-item").slice(0, 8).show();
            $(".fl-item2").slice(0, 3).show();


            if ($(".scroll-loadmore").length > 0) {
                $(window).scroll(function () {
                    if (
                        $(window).scrollTop() >=
                        $(document).height() - $(window).height()
                    ) {
                        setTimeout(() => {
                            $(".fl-item:hidden").slice(0, 2).show();
                            if ($(".fl-item:hidden").length == 0) {
                                $(".view-more-button").hide();
                            }
                        });
                    }
                });
            }
            if ($(".loadmore-item").length > 0) {
                $(".btn-loadmore").on("click", function () {
                    setTimeout(() => {
                        $(".fl-item:hidden").slice(0, 2).show();
                        if ($(".fl-item:hidden").length == 0) {
                            $(".view-more-button").hide();
                        }
                    }, 600);
                });
            }
            if ($(".loadmore-item2").length > 0) {
                $(".btn-loadmore2").on("click", function () {
                    setTimeout(() => {
                        $(".fl-item2:hidden").slice(0, 1).show();
                        if ($(".fl-item2:hidden").length == 0) {
                            $(".view-more-button2").hide();
                        }
                    }, 600);
                });
            }
        }
    };

    var counter = function () {
        if ($(document.body).hasClass("counter-scroll")) {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const element = $(entry.target);

                            if (!element.hasClass("odometer-activated")) {
                                const to = element.data("to");
                                element.addClass("odometer-activated");

                                element.html(to);
                            }

                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            $(".counter .number").each(function () {
                observer.observe(this);
            });
        }
    };

    var ajaxContactForm = function () {
        $("#contactform,#commentform").each(function () {
            $(this).validate({
                submitHandler: function (form) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $("<div />", { class: "loading" });

                    $.ajax({
                        type: "POST",
                        url: $form.attr("action"),
                        data: str,
                        beforeSend: function () {
                            $form.find(".send-wrap").append(loading);
                        },
                        success: function (msg) {
                            var result, cls;
                            if (msg === "Success") {
                                result = "Message Sent Successfully To Email Administrator";
                                cls = "msg-success";
                            } else {
                                result = "Error sending email.";
                                cls = "msg-error";
                            }

                            $form.prepend(
                                $("<div />", {
                                    class: "flat-alert mb-20 " + cls,
                                    text: result,
                                }).append(
                                    $(
                                        '<a class="close mt-0" href="#"><i class="fa fa-close"></i></a>'
                                    )
                                )
                            );

                            $form.find(":input").not(".submit").val("");
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find(".loading").remove();
                        },
                    });
                },
            });
        });
    };

    var handleSidebarFilter = function () {
        $("#filterShop,.sidebar-btn").on("click", function () {
            if ($(window).width() <= 1200) {
                $(".sidebar-filter,.overlay-filter").addClass("show");
            }
        });
        $(".close-filter,.overlay-filter").on("click", function () {
            $(".sidebar-filter,.overlay-filter").removeClass("show");
        });
    };

    var parallaxImage = function () {
        if ($(".parallax-img").length > 0) {
            $(".parallax-img").each(function () {
                new SimpleParallax(this, {
                    delay: 0.6,
                    orientation: "up",
                    scale: 1.3,
                    transition: "cubic-bezier(0,0,0,1)",
                    customContainer: "",
                    customWrapper: "",
                });
            });
        }
    };

    

var goTop = function () {
    // Check for the required element before proceeding
    if (jQuery("div").hasClass("progress-wrap")) {
        
        // --- 1. Progress Bar Initialization ---
        var progressPath = document.querySelector(".progress-wrap path");
        
        // Only run SVG path logic if the path element exists
        if (progressPath) {
            var pathLength = progressPath.getTotalLength();
            
            // Disable transition for immediate setting of dasharray/offset
            progressPath.style.transition = progressPath.style.WebkitTransition = "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect(); // Triggers a reflow/repaint
            
            // Re-enable transition for smooth progress update
            progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
        }

        // --- 2. Progress Update Logic ---
        var updateprogress = function () {
            if (!progressPath) return; // Exit if no path exists
            
            var scroll = jQuery(window).scrollTop();
            // Use jQuery's way of getting document height
            var height = jQuery(document).height() - jQuery(window).height(); 
            
            // Ensure we don't divide by zero if the document is not scrollable
            if (height === 0) return;

            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
        };
        
        // --- 3. Button Visibility Logic (Simplified) ---
        var offset = 200; // Defines how far down to scroll before the button appears
        
        // Function to handle visibility
        var toggleProgressWrap = function() {
            var scrollTop = jQuery(window).scrollTop();
            
            // Check if the scroll position is greater than the defined offset (200px)
            // *** Footer logic is removed, so it only checks scroll depth ***
            if (scrollTop > offset) {
                jQuery(".progress-wrap").addClass("active-progress");
            } else {
                jQuery(".progress-wrap").removeClass("active-progress");
            }
        }

        // --- 4. Event Bindings ---
        
        // Bind functions to the scroll event
        jQuery(window).on("scroll", function() {
            if (progressPath) {
                updateprogress(); // Update progress bar
            }
            toggleProgressWrap(); // Toggle button visibility
        });
        
        // Run once on load to set initial state
        if (progressPath) {
            updateprogress();
        }
        toggleProgressWrap(); 

        // --- 5. Scroll-to-Top Click Handler ---
        var duration = 600; // Define scroll duration here (I've changed your 0 to 600ms for smooth scroll)
        
        jQuery(".progress-wrap").on("click", function (event) {
            event.preventDefault();
            // Animate scroll back to the top
            jQuery("html, body").animate({ scrollTop: 0 }, duration);
            return false;
        });
    }
};

// Execute the main function, typically inside a document ready block
// jQuery(document).ready(function() {
//     goTop();
// });

    

    const quoteBtn = document.getElementById('quoteBtn');
        const closeBtn = document.getElementById('closeBtn');
        const quoteModal = document.getElementById('quoteModal');
        const modalOverlay = document.getElementById('modalOverlay');
        const quoteForm = document.getElementById('quoteForm');

        // Open Modal
        quoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            quoteModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close Modal
        const closeModal = () => {
            quoteModal.classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Close on Escape Key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && quoteModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Form Submit
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted! This is a demo.');
            quoteForm.reset();
            closeModal();
        });

    var preloader = function () {
        $("#loading").fadeOut("slow", function () {
            $(this).remove();
        });
    };

    // Dom Ready
    $(function () {
        headerSticky();
        footer();
        changeValue();
        video();
        infiniteScroll();
        counter();
        ajaxContactForm();
        handleSidebarFilter();
        parallaxImage();
        goTop();
        preloader();
    });
})(jQuery);
