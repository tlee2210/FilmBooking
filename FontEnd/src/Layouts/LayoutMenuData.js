import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isMovie, setIsMovie] = useState(false);
  const [isCinema, setIsCinema] = useState(false);
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
  }, [history, isMovie, isCinema]);

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
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
