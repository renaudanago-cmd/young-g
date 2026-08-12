//================================================================================================
// MENU MOBILE
//==================================================================================================

const menuButton = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

if(menuButton && navLinks){
    menuButton.addEventListener("click",function(){
        navLinks.classList.toggle("active");
        menuButton.classList.toggle("is-open");
    });
}

//================================================================================================
// SCROLL ANIMATION
//================================================================================================

const hiddenElements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });

});

hiddenElements.forEach((element,) => {
    observer.observe(element);
});

const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach((card,index)=>{
    card.style.transitionDelay = `${index * 0.30}s`;
});


//===========================================================================================
// LIGHTBOX
//===========================================================================================
// Sélection des éléments de la Lightbox

const photos = document.querySelectorAll(".lightbox-item");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeButton = document.querySelector(".lightbox-close");

const prevButton = document.querySelector(".lightbox-prev");

const nextButton = document.querySelector(".lightbox-next");

const lightboxSeeMore = document.querySelector(".lightbox-see-more")


let currentIndex = 0; 
let currentPhotos = photos;

// Ouvrir la lightbox 

    function openLightbox(index,imageList){

    currentIndex = index;

    currentPhotos = imageList;

    lightbox.style.display = "flex"

    document.body.classList.add("no-scroll");

    lightboxImage.src = currentPhotos[currentIndex].src;
}

photos.forEach((photo,index)=>{

    photo.addEventListener("click",function(){

        openLightbox(index, photos);
    });
});



// Fermer avec la croix

if(closeButton){

    closeButton.addEventListener("click", function(){
        lightbox.style.display = "none";
        document.body.classList.remove("no-scroll");

    });
}

// Fermer en cliquant sur le fond

if(lightbox){
    lightbox.addEventListener("click",function(event){
        if(event.target === lightbox){

            lightbox.style.display = "none"

         document.body.classList.remove("no-scroll");   
        }    

    })
 }

 // Fermer avec Escape

 document.addEventListener("keydown",function(event){
    if(event.key === "Escape"){
        lightbox.style.display = "none";
    document.body.classList.remove("no-scroll");    

    }
 });


// Navigation vers la photo suivante

if(nextButton){

    nextButton.addEventListener("click", showNextPhoto);

}


// Navigation vers la photo précédente 

if(prevButton){

    prevButton.addEventListener("click", showPrevPhoto);

}


// Fonction : Afficher la photo suivante

function showNextPhoto(){

    currentIndex++;

    if(currentIndex >= currentPhotos.length){

        currentIndex = 0;

    }

    lightboxImage.src = currentPhotos[currentIndex].src;

}

// Fonction : Afficher la photo précédente

    function showPrevPhoto(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = currentPhotos.length - 1;

    }

    lightboxImage.src = currentPhotos[currentIndex].src;

}

//===============================================================================================
// GALERIE FILTRABLE
//===============================================================================================

// Tableau des photos par catégorie

const categoryPhotos = [
    {
        image: "images/gallery/portraits/photo1.jpg",
        category:"portraits"
    },

    {
        image: "images/gallery/portraits/photo2.jpg",
        category:"portraits"
    },

    {
        image: "images/gallery/street/photo1.jpg",
        category:"street"
    },

    {
        image: "images/gallery/creative/photo1.jpg",
        category:"creative"
    },

    {
        image: "images/gallery/group/photo1.jpg",
        category:"group"
    }
];


// Gestion du clic sur les cartes catégories

categoryCards.forEach((card) => {

    card.addEventListener("click",function(event){

        event.preventDefault();

        const category = card.dataset.category;

        showCategory(category);
    });
});


// Afficher les photos de la catégorie sélectionée

         function showCategory(category){
         

         const filteredPhotos = categoryPhotos.filter(photo => photo.category === category);

         const lightboxPhotos = filteredPhotos.map(photo => {
            const img = document.createElement("img");

            img.src = photo.image;
            return img;
         });

         if(lightboxPhotos.length > 0){

            openLightbox(0, lightboxPhotos);

            lightboxSeeMore.href = category + ".html";

         }
        
    }
