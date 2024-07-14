import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const navdataManager = () => {
  const history = useNavigate();
  //state data
  const [isMovie, setIsMovie] = useState(false);
  const [isCinema, setIsCinema] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isBlogAndReview, setIsBlogAndReview] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");
  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Movie") {
      setIsMovie(false);
    }
    if (iscurrentState !== "Cinema") {
      setIsCinema(false);
    }
    if (iscurrentState !== "blogAndReview") {
      setIsBlogAndReview(false);
    }
    if (iscurrentState !== "promotion") {
      setIsPromotion(false);
    }
  }, [history, isMovie, isCinema, isBlogAndReview, isPromotion]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "movie",
      label: "Movie Management",
      icon: "ri-movie-2-fill",
      link: "/#",
      stateVariables: isMovie,
      click: function (e) {
        e.preventDefault();
        setIsMovie(!isMovie);
        setIscurrentState("Movie");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "Movie",
          label: "Movie",
          link: "/dashboard/movie",
          parentId: "movie",
        },
        {
          id: "celebrity",
          label: "Celebrity",
          link: "/dashboard/celebrity",
          parentId: "movie",
        },
        {
          id: "MovieGenre",
          label: "Movie Genre",
          link: "/dashboard/movie-genre",
          parentId: "movie",
          // badgeColor: "success",
          // badgeName: "New",
        },
      ],
    },
    {
      id: "cinemas",
      label: "Cinemas Management",
      icon: "bx bx-movie",
      link: "/#",
      stateVariables: isCinema,
      click: function (e) {
        e.preventDefault();
        setIsCinema(!isCinema);
        setIscurrentState("Cinema");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "cinema",
          label: "Cinema",
          link: "/dashboard/cinema",
          parentId: "cinemas",
        },
        {
          id: "room",
          label: "Room",
          link: "/dashboard/room",
          parentId: "cinemas",
        },
        {
          id: "watercorn",
          label: "Water And Corn",
          link: "/dashboard/water-corn",
          parentId: "cinemas",
        },
      ],
    },
    {
      id: "blogAndReview",
      label: "Blog & Review Management",
      icon: "bx bxl-blogger",
      link: "/#",
      stateVariables: isBlogAndReview,
      click: function (e) {
        e.preventDefault();
        setIsBlogAndReview(!isBlogAndReview);
        setIscurrentState("blogAndReview");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "blog",
          label: "Blog Management",
          link: "/dashboard/blog",
          parentId: "blogAndReview",
        },
        {
          id: "review",
          label: "Review Management",
          link: "/dashboard/review",
          parentId: "blogAndReview",
        },
      ],
    },
    {
      id: "promotion",
      label: "Promotion Management",
      icon: "bx bx-volume-full",
      link: "/#",
      stateVariables: isPromotion,
      click: function (e) {
        e.preventDefault();
        setIsPromotion(!isPromotion);
        setIscurrentState("promotion");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "promotion",
          label: "promotion Management",
          link: "/dashboard/promotion",
          parentId: "promotion",
        },
        {
          id: "Voucher",
          label: "Voucher Management",
          link: "/dashboard/voucher",
          parentId: "promotion",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default navdataManager;
