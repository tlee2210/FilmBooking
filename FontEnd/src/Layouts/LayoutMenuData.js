import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isMovie, setIsMovie] = useState(false);
  const [isCinema, setIsCinema] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isShowTime, setIsShowTime] = useState(false);
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
    if (iscurrentState !== "User") {
      setIsUser(false);
    }
    if (iscurrentState !== "showtime") {
      setIsShowTime(false);
    }
    if (iscurrentState !== "blogAndReview") {
      setIsBlogAndReview(false);
    }
  }, [history, isMovie, isCinema, isUser, isShowTime, isBlogAndReview]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "user",
      label: "User Management",
      icon: "ri-user-fill",
      link: "/#",
      stateVariables: isUser,
      click: function (e) {
        e.preventDefault();
        setIsUser(!isUser);
        setIscurrentState("User");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "user",
          label: "User",
          link: "/dashboard/users",
          parentId: "user",
          // badgeColor: "success",
          // badgeName: "New",
        },
      ],
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
      icon: "ri-dashboard-2-line",
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
      id: "showtime",
      label: "Show Time Management",
      icon: "ri-slideshow-2-fill",
      link: "/#",
      stateVariables: isShowTime,
      click: function (e) {
        e.preventDefault();
        setIsShowTime(!isShowTime);
        setIscurrentState("showtime");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "cinema",
          label: "Show Time Movie",
          link: "/dashboard/show-time",
          parentId: "showtime",
        },
      ],
    },
    {
      id: "blogAndReview",
      label: "Blog & Review Management",
      icon: "ri-slideshow-2-fill",
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
          link: "/dashboard/show-time",
          parentId: "blogAndReview",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
