document.addEventListener("DOMContentLoaded", async () => {

  const layoutRoot = document.getElementById("layout");

  /*
   * ============================================================
   * PAGE CONFIGURATION
   * ============================================================
   */

  const pages = {
    about: "about.html",
    diary: "diary.html",
    gallery: "gallery.html"
  };


  /*
   * ============================================================
   * LOAD PAGE
   * ============================================================
   */

  async function loadPage(page, updateURL = true) {

    const file = pages[page];

    if (!file) {
      console.error(`Unknown page: ${page}`);
      return;
    }

    try {

      const response = await fetch(file, {
        cache: "no-cache"
      });

      if (!response.ok) {
        throw new Error(
          `Could not load ${file}: HTTP ${response.status}`
        );
      }

      const html = await response.text();

      const parser = new DOMParser();

      const pageDocument = parser.parseFromString(
        html,
        "text/html"
      );

      /*
       * Find the main article in the requested page.
       *
       * This only requires:
       *
       * <article class="main">
       *
       * No special data attribute is necessary.
       */

      const pageMain =
        pageDocument.querySelector("article.main");

      if (!pageMain) {
        throw new Error(
          `No <article class="main"> found in ${file}`
        );
      }


      /*
       * Find the main article in the current layout.
       */

      const main =
        document.querySelector(".aesthetique article.main");

      if (!main) {
        throw new Error(
          "Current layout does not contain article.main"
        );
      }


      /*
       * Replace the contents of the current main article.
       */

      main.innerHTML = pageMain.innerHTML;


      /*
       * Update the document title.
       */

      const title =
        pageDocument.querySelector("title");

      if (title) {
        document.title = title.textContent;
      }


      /*
       * Update the active sidebar link.
       */

      document
        .querySelectorAll(".sidebar-nav a")
        .forEach(link => {

          link.classList.toggle(
            "active",
            link.dataset.page === page
          );

        });


      /*
       * Change the URL without reloading the entire site.
       */

      if (updateURL) {

        history.pushState(
          { page: page },
          "",
          file
        );

      }

    } catch (error) {

      console.error(error);

      const main =
        document.querySelector(".aesthetique article.main");

      if (main) {

        main.innerHTML = `
          <h2>Unable to load page.</h2>
          <p>
            ${error.message}
          </p>
        `;

      }

    }

  }


  /*
   * ============================================================
   * COMPLETE SITE LAYOUT
   * ============================================================
   */

  layoutRoot.innerHTML = `

    <div class="crt-allthethings"></div>

    <div class="headertop"></div>

    <div class="thisisadigitalgarden">

      <div class="rabbitwave98">
        ｒａｂｂｉｔｗａｖｅ９８
      </div>

      <br>

      <div class="thisisa">
        [ this is a digital garden. ]
      </div>

    </div>


    <div class="disco">
      <div class="crt-filter"></div>
    </div>


    <div class="container">

      <div class="escucha">

        <h1>

          <div class="set1">
            [ behold, a view of nothing ]
          </div>

          <div class="set2">
            [ behold, a view of nothing ]
          </div>

          <div class="set3">
            [ behold, a view of nothing ]
          </div>

        </h1>

      </div>


      <div class="chungus">

        <img src="https://rabbitwave98.notion.site/image/attachment%3A717ae1c6-eac2-4aca-aa86-5292a5a8b515%3Aimage.png?table=block&id=2f9a0c83-65f5-80be-ba09-eb8bbec250e3&spaceId=ce1a0c83-65f5-81e0-a168-0003ed8735e0&width=2000&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl">

        <img src="https://rabbitwave98.notion.site/image/attachment%3A6a9750d1-cdfe-41b9-abeb-54fb67426a6a%3Aimage.png?table=block&id=2f9a0c83-65f5-804d-927e-e5ec8ac501af&spaceId=ce1a0c83-65f5-81e0-a168-0003ed8735e0&width=2000&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl">

        <img src="https://rabbitwave98.notion.site/image/attachment%3A76cf7cbe-ee79-404c-8ca1-4ec78f770f7c%3Aimage.png?table=block&id=2f9a0c83-65f5-8037-b64f-e05d7ec213ae&spaceId=ce1a0c83-65f5-81e0-a168-0003ed8735e0&width=2000&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl">

        <img src="https://rabbitwave98.notion.site/image/attachment%3A6e358495-206a-4d21-8bde-7f1694de6ab4%3Aimage.png?table=block&id=2f9a0c83-65f5-8000-8f25-e1036fc2c546&spaceId=ce1a0c83-65f5-81e0-a168-0003ed8735e0&width=2000&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl">

      </div>

    </div>


    <div class="aesthetique">

      <div class="wrapper">


        <header class="header">

          <h1 style="
            line-height: 26px;
            margin-top: 1px;
          ">

            .𝚊𝚙𝚙 𝚝𝚘 𝚋𝚎 𝚊 𝚏𝚛𝚒𝚎𝚗𝚍𝚕𝚢 .𝚎𝚡𝚎
            ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ

            <br>

            <div style="
              width: 100%;
              text-align: center;
              background-color: #d5bef270;
              display: inline-block;
              position: relative;
              border-radius: 5px;
              color: #16161d;
              margin-left: -2.5px;
              padding-right: 5px;
              font-family: playfair display;
              letter-spacing: 1px;
              margin-bottom: -15px;
            ">

              ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
              [ these are aesthetics maybe ]

            </div>

          </h1>

        </header>


        <article class="main"></article>


        <aside class="aside aside-1">

          <nav class="sidebar-nav">

            <a
              href="about.html"
              data-page="about"
            >
              about
            </a>

            <a
              href="diary.html"
              data-page="diary"
            >
              diary
            </a>

            <a
              href="gallery.html"
              data-page="gallery"
            >
              gallery
            </a>

          </nav>

        </aside>


        <footer class="footer">
          Footer
        </footer>


      </div>

    </div>

  `;


  /*
   * ============================================================
   * SIDEBAR NAVIGATION
   * ============================================================
   */

  document
    .querySelectorAll(".sidebar-nav a")
    .forEach(link => {

      link.addEventListener("click", event => {

        event.preventDefault();

        loadPage(
          link.dataset.page,
          true
        );

      });

    });


  /*
   * ============================================================
   * BROWSER BACK / FORWARD
   * ============================================================
   */

  window.addEventListener("popstate", () => {

    const currentFile =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const page =
      Object.entries(pages)
        .find(
          ([, file]) =>
            file.toLowerCase() === currentFile
        )?.[0];

    if (page) {
      loadPage(page, false);
    }

  });


  /*
   * ============================================================
   * INITIAL PAGE
   * ============================================================
   */

  const currentFile =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();


  const initialPage =
    Object.entries(pages)
      .find(
        ([, file]) =>
          file.toLowerCase() === currentFile
      )?.[0]
    || "about";


  await loadPage(
    initialPage,
    false
  );

});