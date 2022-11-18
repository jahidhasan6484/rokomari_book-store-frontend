import { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../images/rokomari_logo.png';
import { CartContext } from '../../App';

const Navbar = () => {
  const [cart, setCart, booksList] = useContext(CartContext);

  let time = '';
  const [localTime, setLocalTime] = useState(time)

  const currentTime = () => {
    let time = new Date().toLocaleTimeString().split(":");
    let secondAndStatus = time[2].split(" ")
    let hour = time[0];
    let minute = time[1];
    let second = secondAndStatus[0];
    let status = secondAndStatus[1];

    time = convertedTime(hour, minute, second, status);
    setLocalTime(time)
  }

  const convertedTime = (_hour, _minute, _second, _status) => {
    let hour = _hour.split("")
    let h1;
    let h2;

    if (hour.length > 1) {
      h1 = hour[0];
      h2 = hour[0];
    } else {
      h1 = 0;
      h2 = hour[0];
    }


    let minute = _minute.split("")
    let m1;
    let m2;

    if (minute.length > 1) {
      m1 = minute[0];
      m2 = minute[1];
    } else {
      m1 = 0;
      m2 = minute[0];
    }

    let second = _second.split("")
    let s1;
    let s2;

    if (second.length > 1) {
      s1 = second[0];
      s2 = second[1];
    } else {
      s1 = 0;
      s2 = second[0];
    }


    const numberMap = {
      0: "০",
      1: "১",
      2: "২",
      3: "৩",
      4: "৪",
      5: "৫",
      6: "৬",
      7: "৭",
      8: "৮",
      9: "৯",
    }

    let status = '';

    if (_status == "AM") {
      if (_hour <= 5) {
        status = "রাত"
      } else if (_hour <= 6) {
        status = "ভোর"
      } else {
        status = "সকাল"
      }
    } else if (_status == "PM") {
      if (_hour <= 3) {
        status = "দুপুর"
      } else if (_hour <= 5) {
        status = "বিকাল"
      } else if (_hour <= 7) {
        status = "সন্ধ্যা"
      } else {
        status = "রাত"
      }
    }

    return `${status} ${numberMap[h1]}${numberMap[h2]} : ${numberMap[m1]}${numberMap[m2]} : ${numberMap[s1]}${numberMap[s2]}`
  }

  setInterval(currentTime, 1000);

  const convertedCartItem = (_itemLength) => {
    let tempItemLength = String(_itemLength).split("");
    let result = [];

    const numberMap = {
      0: "০",
      1: "১",
      2: "২",
      3: "৩",
      4: "৪",
      5: "৫",
      6: "৬",
      7: "৭",
      8: "৮",
      9: "৯",
    }

    for (let i = 0; i < tempItemLength.length; i++) {
      result.push(numberMap[tempItemLength[i]])
    }

    return result.join("");
  }

  return (
    <div class="fixed-top bg-light border-bottom">
      <header class="container blog-header lh-1 py-3">
        <div class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-md-4 pt-5 localTime">
            <p class="link-secondary">{localTime}</p>
          </div>
          <div class="col-md-4 col-6 text-center">
            <Link to="/">
              <img src={logo} className="logo" alt='Rokomai Logo' />
            </Link>
          </div>
          <div class="col-md-4 col-6 d-flex justify-content-end align-items-center gap-3">
            <div className='cart'>
              <Link to="/cart">
                <p className='cartItemCount'>{convertedCartItem(cart.length)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>

              </Link>
            </div>
            <Link to="/signIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-gear " viewBox="0 0 16 16">
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
            </Link>

            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <Link to="/">
              <img src={logo} className="logo" alt='Rokomai Logo' />
            </Link>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  লেখক
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link to={`/author/${"হুমায়ূন আহমেদ"}`} class="nav-link">হুমায়ূন আহমেদ</Link>
                  </li>
                  <li>
                    <Link to={`/author/${"মুহম্মদ জাফর ইকবাল"}`} class="nav-link">মুহম্মদ জাফর ইকবাল</Link>
                  </li>
                  <li>
                    <Link to={`/author/${"তামিম শাহরিয়ার সুবিন"}`} class="nav-link">তামিম শাহরিয়ার সুবিন</Link>
                  </li>
                  <li>
                    <Link to={`/author/${"শরৎচন্দ্র চট্টোপাধ্যায়"}`} class="nav-link">শরৎচন্দ্র চট্টোপাধ্যায়</Link>
                  </li>
                  <li>
                    <Link to={`/author/${"ঝংকার মাহবুব"}`} class="nav-link">ঝংকার মাহবুব</Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  বিষয়
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link to={`/category/${"উপন্যাস"}`} class="nav-link">উপন্যাস</Link>
                  </li>
                  <li>
                    <Link to={`/category/${"শিশু-কিশোর বই"}`} class="nav-link">শিশু-কিশোর বই</Link>
                  </li>
                  <li>
                    <Link to={`/category/${"সায়েন্স ফিকশন"}`} class="nav-link">সায়েন্স ফিকশন</Link>
                  </li>
                  <li class="nav-item">
                    <Link to={`/category/${"ইসলামি বই"}`} class="nav-link">ইসলামি বই</Link>
                  </li>
                  <li>
                    <Link to={`/category/${"ইঞ্জিনিয়ারিং"}`} class="nav-link">ইঞ্জিনিয়ারিং</Link>
                  </li>
                  <li>
                    <Link to={`/category/${"মেডিকেল"}`} class="nav-link">মেডিকেল</Link>
                  </li>
                  <li>
                    <Link to={`/category/${"রাজনীতি"}`} class="nav-link">রাজনীতি</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to={`/category/${"কম্পিউটার, ফ্রিল্যান্সিং ও প্রোগ্রামিং"}`} class="nav-link">কম্পিউটার, ফ্রিল্যান্সিং ও প্রোগ্রামিং</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar;