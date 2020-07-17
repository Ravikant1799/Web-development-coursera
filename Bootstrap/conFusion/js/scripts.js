$(document).ready(function(){
    $("#mycarousel").carousel({interval:2000});
    $("#carouselButton").click(function(){
        if ($("#carouselButton").children("span").hasClass('fa-pause')){
            $("#mycarousel").carousel('pause');
            $("#carouselButton").children("span").removeClass('fa-pause');
            $("#carouselButton").children("span").addClass('fa-play');
        }
        else if($("#carouselButton").children("span").hasClass('fa-play')){
            $("#mycarousel").carousel('cycle');
            $("#carouselButton").children("span").removeClass('fa-play');
            $("#carouselButton").children("span").addClass('fa-pause');
        }
    });

    $("#carousel-play").click(function(){
        $("#mycarousel").carousel("cycle");
    });

    $("#loginModalOpen").click(function(){
        $("#loginModal").modal("show");
    })

    $("#loginModalClose").click(function(){
        $("#loginModal").modal("hide");
    })

    $("#loginModalCancel").click(function(){
        $("#loginModal").modal("hide");
    })

    $("#reserveModalOpen").click(function(){
        $("#reserveModal").modal("show");
    })

    $("#reserveModalClose").click(function(){
        $("#reserveModal").modal("hide");
    })

    $("#reserveModalCancel").click(function(){
        $("#reserveModal").modal("hide");
    })


});