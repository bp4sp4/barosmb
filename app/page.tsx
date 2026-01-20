"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./page.module.css";

export default function Home() {
  const [showFloatingBanner, setShowFloatingBanner] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [coinsLoaded, setCoinsLoaded] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clickSource, setClickSource] = useState<string>("");
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentsSectionRef = useRef<HTMLDivElement>(null);
  const contentsSectionBlueRef = useRef<HTMLDivElement>(null);
  const contentsIconsWrapperRef = useRef<HTMLDivElement>(null);
  const newSectionRef = useRef<HTMLDivElement>(null);
  const content005SectionRef = useRef<HTMLDivElement>(null);
  const consultSectionRef = useRef<HTMLDivElement>(null);
  const contentsTextRef = useRef<HTMLParagraphElement>(null);
  const contentsButtonRef = useRef<HTMLParagraphElement>(null);
  const contentsImage1Ref = useRef<HTMLImageElement>(null);
  const contentsImage2Ref = useRef<HTMLImageElement>(null);
  const contentsImage3Ref = useRef<HTMLImageElement>(null);
  const contentsCard1Ref = useRef<HTMLImageElement>(null);
  const contentsCard2Ref = useRef<HTMLImageElement>(null);
  const contentsCard3Ref = useRef<HTMLImageElement>(null);
  const checkImage1Ref = useRef<HTMLImageElement>(null);
  const checkImage2Ref = useRef<HTMLImageElement>(null);
  const checkImage3Ref = useRef<HTMLImageElement>(null);
  const checkImage4Ref = useRef<HTMLImageElement>(null);
  const reviewImage1Ref = useRef<HTMLDivElement>(null);
  const reviewImage2Ref = useRef<HTMLDivElement>(null);
  const reviewImage3Ref = useRef<HTMLDivElement>(null);
  const reviewImage4Ref = useRef<HTMLDivElement>(null);
  const reviewImage5Ref = useRef<HTMLDivElement>(null);
  const headerImage1Ref = useRef<HTMLImageElement>(null);
  const headerImage2Ref = useRef<HTMLImageElement>(null);
  const headerImage3Ref = useRef<HTMLImageElement>(null);
  const infomationSectionRef = useRef<HTMLDivElement>(null);
  const contents004SectionRef = useRef<HTMLDivElement>(null);
  const consultImage1Ref = useRef<HTMLImageElement>(null);
  const consultImage2Ref = useRef<HTMLImageElement>(null);
  const donworryImage1Ref = useRef<HTMLImageElement>(null);
  const donworryImage2Ref = useRef<HTMLImageElement>(null);
  const donworryImage3Ref = useRef<HTMLImageElement>(null);
  const footerSubtitleRef = useRef<HTMLParagraphElement>(null);

  // 연락처 포맷팅 함수 (010-XXXX-XXXX)
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, "");

    // 길이에 따라 포맷팅
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  // 연락처 입력 핸들러
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, contact: formatted });
  };

  // 폼 유효성 검사
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.contact.replace(/[^\d]/g, "").length >= 10 &&
    privacyAgreed;

  const handleCloseModal = () => {
    // 배경 클릭 시 그냥 닫기만
    setShowModal(false);
  };

  const handleCloseButtonClick = () => {
    // X 버튼 클릭 시 "다시 신청" 팝업 표시
    setShowModal(false);
    setShowSuccessModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyAgreed) {
      alert("개인정보 처리방침에 동의해주세요.");
      return;
    }

    if (!formData.name || !formData.contact) {
      alert("이름과 연락처를 입력해주세요.");
      return;
    }

    // 연락처 유효성 검사 (최소 10자리 숫자)
    const phoneNumbers = formData.contact.replace(/[^\d]/g, "");
    if (phoneNumbers.length < 10) {
      alert("올바른 연락처를 입력해주세요. (010-XXXX-XXXX)");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          privacyAgreed: privacyAgreed,
          clickSource: clickSource || "unknown",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "제출에 실패했습니다.");
      }

      // 성공 시 모달 닫고 신청 완료 팝업 표시
      setShowModal(false);
      setShowCompletedModal(true);

      // 폼 초기화
      setFormData({ name: "", contact: "" });
      setPrivacyAgreed(false);
      setClickSource(""); // 추적 정보 초기화
    } catch (error) {
      console.error("Submit error:", error);
      alert(
        error instanceof Error ? error.message : "제출 중 오류가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      const footerTop = footerRef.current.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = footerTop - startPosition;
      const duration = 500; // 빠른 스크롤 (500ms)
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const progressRatio = Math.min(progress / duration, 1);
        const ease = progressRatio * (2 - progressRatio); // ease-out

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  };

  // utm_source를 한글 형식으로 변환
  const formatClickSource = (
    utmSource: string,
    materialId: string | null
  ): string => {
    const sourceMap: { [key: string]: string } = {
      daangn: "당근마켓",
      insta: "인스타그램",
    };

    const koreanSource = sourceMap[utmSource] || utmSource;

    if (materialId) {
      return `${koreanSource}_소재_${materialId}`;
    }
    return koreanSource;
  };

  // check.gif 이미지 미리 로드 (신청 완료 모달이 즉시 표시되도록)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // link 태그로 프리로드
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = "/check.gif";
      link.as = "image";
      document.head.appendChild(link);

      // Image 객체로도 미리 로드 (이중 보장)
      const img = new window.Image();
      img.src = "/check.gif";
    }
  }, []);

  // URL 파라미터에서 utm_source 읽어서 clickSource 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source");
      const materialId = params.get("material_id");

      if (utmSource) {
        setClickSource(formatClickSource(utmSource, materialId));
      }
    }
  }, []);

  // 모달 열기 핸들러 (URL 파라미터가 있으면 우선시)
  const handleOpenModal = (
    defaultSource: string,
    trackSource: boolean = true
  ) => {
    if (trackSource) {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get("utm_source");
        const materialId = params.get("material_id");

        if (utmSource) {
          setClickSource(formatClickSource(utmSource, materialId));
        } else {
          setClickSource(defaultSource);
        }
      } else {
        setClickSource(defaultSource);
      }
    } else {
      // 추적하지 않는 경우 (헤더 클릭 등)
      setClickSource("");
    }
    setShowModal(true);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (footerRef.current) {
            const footerTop = footerRef.current.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // footer가 화면에 보이기 시작하면 숨기기
            if (footerTop <= windowHeight - 100) {
              setShowFloatingBanner(false);
            } else {
              setShowFloatingBanner(true);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // 초기 체크

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Intersection Observer 설정
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fadeInUp");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 각 섹션 관찰
    const sections = [
      headerImage1Ref.current,
      headerImage2Ref.current,
      headerImage3Ref.current,
      contentsSectionRef.current,
      infomationSectionRef.current,
      content005SectionRef.current,
      contents004SectionRef.current,
      consultImage1Ref.current,
      consultImage2Ref.current,
      donworryImage1Ref.current,
      donworryImage2Ref.current,
      donworryImage3Ref.current,
      footerSubtitleRef.current,
      consultSectionRef.current,
      newSectionRef.current,
      contentsCard1Ref.current,
      contentsCard2Ref.current,
      contentsCard3Ref.current,
      checkImage1Ref.current,
      checkImage2Ref.current,
      checkImage3Ref.current,
      checkImage4Ref.current,
    ].filter(Boolean);

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className={styles.layout_wrapper}>
      <div className={styles.header_gnb}>
        <div className={styles.header_wrapper}>
          <a
            href="https://xn--ok0bx6qu3cv5m.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block" }}
          >
            <img
              src="/baro_logo.png"
              alt="logo"
              className={styles.baro_logo}
              draggable="false"
            />
          </a>
          <button
            className={styles.hamburger_button}
            aria-label={showMenu ? "닫기" : "메뉴"}
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path
                  d="M18 16.5L27 7.5L28.5 9L19.5 18L28.5 27L27 28.5L18 19.5L9 28.5L7.5 27L16.5 18L7.5 9L9 7.5L18 16.5Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M23.75 20C24.4404 20 25 20.5596 25 21.25C25 21.9404 24.4404 22.5 23.75 22.5H6.25C5.55964 22.5 5 21.9404 5 21.25C5 20.5596 5.55964 20 6.25 20H23.75ZM23.75 13.75C24.4404 13.75 25 14.3096 25 15C25 15.6904 24.4404 16.25 23.75 16.25H6.25C5.55964 16.25 5 15.6904 5 15C5 14.3096 5.55964 13.75 6.25 13.75H23.75ZM23.75 7.5C24.4404 7.5 25 8.05964 25 8.75C25 9.44036 24.4404 10 23.75 10H6.25C5.55964 10 5 9.44036 5 8.75C5 8.05964 5.55964 7.5 6.25 7.5H23.75Z"
                  fill="black"
                />
              </svg>
            )}
          </button>
        </div>
        {showMenu && (
          <div className={styles.menu}>
            <a
              href="https://xn--ok0bx6qu3cv5m.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menu_item}
              onClick={() => {}}
            >
              한평생바로기업
            </a>
            <a
              href="https://xn--ok0bx6qu3cv5m.com/policyfunds"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menu_item}
              onClick={() => {}}
            >
              정책자금
            </a>
          </div>
        )}
      </div>
      <div className={styles.container}>
        {/* 배경 이미지를 별도 태그로 배치 */}
        <img src="/headerbackground.png" className={styles.abs_bg} alt="background" />
        
        <div ref={contentRef} className={styles.content}>
          <div className={styles.contents_text_wrapper}>
            <p className={styles.contents_subtitle_text}>
              저금리 높은 한도 사업자들을 위한 최고의 정부지원 자금
            </p>
            <p className={styles.contents_main_title_text}>
              2026 소상공인
            </p>
            <p className={styles.contents_budget_text}>
              지원예산 5.4조원!
            </p>
          </div>
          <div className={styles.header_images_wrapper}>
            <img
              ref={headerImage1Ref}
              src="/header_001.png"
              alt="header 1"
              className={styles.header_image}
            />
            <img
              ref={headerImage2Ref}
              src="/header_002.png"
              alt="header 2"
              className={styles.header_image}
            />
            <img
              ref={headerImage3Ref}
              src="/header_003.png"
              alt="header 3"
              className={styles.header_image}
            />
          </div>
          <div className={styles.header_question_wrapper}>
            <p className={styles.header_question_text}>
              근데 왜?
            </p>
            <p className={styles.header_question_text}>
              많은 대표님들이 못받을까요?
            </p>
          </div>
        </div>

        <div ref={contentsSectionRef} className={styles.contents_section}>
          <img src="/contents_001.png" alt="contents" className={styles.contents_image} />
        </div>
      </div>
      <div ref={infomationSectionRef} className={styles.infomation_section}>
          <img src="/contents_002.png" alt="contents" className={styles.contents_image} />
        </div>

    
      <div className={styles.check_section}>
        <div className={styles.check_background}></div>
        <div className={styles.check_content_wrapper}>
          <p className={styles.check_text}>아래 해당하시는 분들은 상담이 어렵습니다</p>
          <div className={styles.check_button}>상담 전 필수 체크리스트</div>
          <div className={styles.check_images}>
            <img 
              ref={checkImage1Ref}
              src="/check_001.png" 
              alt="사업자 대출을 이미 보유하고 있다" 
              className={styles.check_image}
            />
            <img 
              ref={checkImage2Ref}
              src="/check_002.png" 
              alt="이자 부담이 계속 신경쓰인다" 
              className={styles.check_image}
            />
            <img 
              ref={checkImage3Ref}
              src="/check_003.png" 
              alt="은행 설명이 어려워 질문을 포기한 적이 있다" 
              className={styles.check_image}
            />
  
          </div>
        </div>
      </div>

      <div ref={content005SectionRef} className={styles.contents_section}>
        <img
          src="/contents_003.png"
          alt="contents"
          className={styles.contents_image}
        />
      </div>
      <div ref={contents004SectionRef} className={styles.contents_section}>
        <img
          src="/contents_004.png"
          alt="contents"
          className={styles.contents_image}
        />
      </div>

     <div ref={consultSectionRef} className={styles.consult_section}>
       <p className={styles.consult_text_white}>
         다 알려드리지만 너무 바쁘셔서
         <br />
       <span className={styles.consult_text_yellow}>
       직접 신청이 어려우신 대표님이라면?
       </span>
       </p>
       <div className={styles.consult_images_wrapper}>
         <img
           ref={consultImage1Ref}
           src="/consult_002.png"
           alt="consult 2"
           className={styles.consult_image}
         />
         <img
           ref={consultImage2Ref}
           src="/consult_003.png"
           alt="consult 3"
           className={styles.consult_image}
         />
       </div>
   
       <p className={styles.consult_info_text}>
         정책자금 자문 컨설팅은 <span className={styles.consult_info_bold}>전문가의 기업진단</span> 후
         <br />
         필요하다고 판단 시 신청 가능합니다.
       </p>
     </div>

    <div className={styles.donworry_section}>
      <div className={styles.donworry_text_wrapper}>
        <div className={styles.donworry_button}>
          손쉬운 자금 마련,
        </div>
        <p className={styles.donworry_title}>
          더이상 혼자 고민하지 마세요!
        </p>
      </div>
      <div className={styles.donworry_images_wrapper}>
        <img
          ref={donworryImage1Ref}
          src="/donworry_002.png"
          alt="donworry 2"
          className={styles.donworry_image}
        />
        <img
          ref={donworryImage2Ref}
          src="/donworry_003.png"
          alt="donworry 3"
          className={styles.donworry_image}
        />
        <img
          ref={donworryImage3Ref}
          src="/donworry_004.png"
          alt="donworry 4"
          className={styles.donworry_image}
        />
      </div>
      <div className={styles.donworry_focus_wrapper}>
        <img
          src="/donworry_005.png"
          alt="thumbs up"
          className={styles.donworry_thumbs_image}
        />
        <p className={styles.donworry_focus_text}>
          대표님은 <span className={styles.donworry_focus_highlight}>사업에만 집중</span>하세요
        </p>
        <p className={styles.donworry_focus_subtext}>
          정확한 진단으로 우리 회사가 받을 수 있는
          <br />
          정책자금 더 이상 놓치지 마세요!
        </p>
      </div>
    </div>
      <footer ref={footerRef} className={styles.footer}>
        <div className={styles.summary_wrapper}>
          <div className={styles.summary_text_wrapper_new}>
            <div className={styles.summary_badge}>
              10초면 신청가능한
            </div>
            <p className={styles.summary_title_new}>
              <span className={styles.summary_title_yellow}>1:1 맞춤 정책자금              <span className={styles.summary_title_white}>기업진단!</span> </span>
            </p>
            <p className={styles.summary_description}>
              이미 많은 기업들이 저희와 함께하고 계십니다.
            </p>
          </div>
          
        </div>
        <p ref={footerSubtitleRef} className={styles.footer_subtitle}>
          이젠, <span className={styles.footer_subtitle_bold}>대표님 차례</span>입니다.
        </p>
        <button
          className={styles.footer_button}
          onClick={() => handleOpenModal("소상공인-랜딩페이지")}
        >
          컨설팅 무료 상담신청
        </button>
      </footer>
      {showFloatingBanner && (
        <div className={styles.floating_banner}>
          <button onClick={scrollToFooter} className={styles.floating_button}>
          컨설팅 무료 상담신청
          </button>
        </div>
      )}
      {showModal && (
        <div className={styles.modal_overlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modal_close}
              onClick={handleCloseButtonClick}
              aria-label="닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <rect
                  width="20"
                  height="20"
                  rx="10"
                  fill="black"
                  fillOpacity="0.3"
                />
                <path
                  d="M10 10.7985L7.20532 13.5932C7.10076 13.6977 6.96768 13.75 6.80608 13.75C6.64449 13.75 6.51141 13.6977 6.40684 13.5932C6.30228 13.4886 6.25 13.3555 6.25 13.1939C6.25 13.0323 6.30228 12.8992 6.40684 12.7947L9.20152 10L6.40684 7.20532C6.30228 7.10076 6.25 6.96768 6.25 6.80608C6.25 6.64449 6.30228 6.51141 6.40684 6.40684C6.51141 6.30228 6.64449 6.25 6.80608 6.25C6.96768 6.25 7.10076 6.30228 7.20532 6.40684L10 9.20152L12.7947 6.40684C12.8992 6.30228 13.0323 6.25 13.1939 6.25C13.3555 6.25 13.4886 6.30228 13.5932 6.40684C13.6977 6.51141 13.75 6.64449 13.75 6.80608C13.75 6.96768 13.6977 7.10076 13.5932 7.20532L10.7985 10L13.5932 12.7947C13.6977 12.8992 13.75 13.0323 13.75 13.1939C13.75 13.3555 13.6977 13.4886 13.5932 13.5932C13.4886 13.6977 13.3555 13.75 13.1939 13.75C13.0323 13.75 12.8992 13.6977 12.7947 13.5932L10 10.7985Z"
                  fill="white"
                />
              </svg>
            </button>
            <div className={styles.modal_inner}>
              <p className={styles.modal_top_text}>지금 바로 시작하세요</p>
            </div>
            <h2 className={styles.modal_title}>정책자금 무료상담 신청</h2>
            <form className={styles.modal_form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="이름 혹은 회사명"
                className={styles.modal_input}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="개인 연락처 혹은 회사 연락처"
                className={styles.modal_input}
                value={formData.contact}
                onChange={handleContactChange}
                maxLength={13}
                required
              />
            </form>
            <div className={styles.modal_privacy}>
              <span className={styles.modal_privacy_text}>
                개인정보 처리방침 동의
              </span>
              <button
                className={styles.modal_checkbox}
                onClick={() => setPrivacyAgreed(!privacyAgreed)}
                aria-label="개인정보 처리방침 동의"
                aria-checked={privacyAgreed}
              >
                {privacyAgreed && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.364 3.40735C14.5515 3.59487 14.6568 3.84918 14.6568 4.11435C14.6568 4.37951 14.5515 4.63382 14.364 4.82135L6.86867 12.3167C6.76962 12.4158 6.65202 12.4943 6.52259 12.548C6.39316 12.6016 6.25443 12.6292 6.11433 12.6292C5.97424 12.6292 5.83551 12.6016 5.70608 12.548C5.57665 12.4943 5.45905 12.4158 5.36 12.3167L1.636 8.59335C1.54049 8.5011 1.46431 8.39076 1.4119 8.26875C1.35949 8.14675 1.3319 8.01553 1.33075 7.88275C1.3296 7.74997 1.3549 7.61829 1.40518 7.49539C1.45546 7.3725 1.52971 7.26085 1.6236 7.16695C1.7175 7.07306 1.82915 6.99881 1.95205 6.94853C2.07494 6.89825 2.20662 6.87294 2.3394 6.8741C2.47218 6.87525 2.6034 6.90284 2.7254 6.95525C2.84741 7.00766 2.95775 7.08384 3.05 7.17935L6.114 10.2433L12.9493 3.40735C13.0422 3.31442 13.1525 3.2407 13.2738 3.19041C13.3952 3.14011 13.5253 3.11423 13.6567 3.11423C13.788 3.11423 13.9181 3.14011 14.0395 3.19041C14.1609 3.2407 14.2711 3.31442 14.364 3.40735Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className={styles.modal_privacy_content}>
              <div className={styles.modal_privacy_scroll}>
                <p className={styles.modal_privacy_item}>
                  <strong>1. 개인정보 수집 및 이용 목적</strong>
                  <br />
                  상담 진행, 정책자금 컨설팅, 문의사항 응대, 민원해결
                  <br />
                  광고성 정보 수신에 대하여 별도의 동의를 한 회원에 한하여
                  "한평생 바로기업"과 각 제휴사의 새로운 서비스, 이벤트, 최신
                  정보의 안내 등 회원의 취향에 맞는 최적의 정보 제공
                </p>
                <p className={styles.modal_privacy_item}>
                  <strong>2. 수집 및 이용하는 개인정보 항목</strong>
                  <br />
                  (필수) 이름(회사명), 휴대전화번호
                  <br />
                  (선택) 제출된 상담 문의 내용 또는 첨부파일에 기재된 개인정보
                </p>
                <p className={styles.modal_privacy_item}>
                  <strong>3. 보유 및 이용 기간</strong>
                  <br />
                  법령이 정하는 경우를 제외하고는 수집일로부터 1년 또는 동의
                  철회 시까지 보유 및 이용합니다.
                </p>
                <p className={styles.modal_privacy_item}>
                  <strong>4. 동의 거부 권리</strong>
                  <br />
                  신청자는 동의를 거부할 권리가 있습니다. 단, 동의를 거부하는
                  경우 상담 서비스 이용이 제한됩니다.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className={styles.modal_submit_button}
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? "제출 중..." : "무료상담 신청하기"}
            </button>
          </div>
        </div>
      )}
      {showCompletedModal && (
        <div
          className={styles.modal_overlay}
          onClick={() => setShowCompletedModal(false)}
        >
          <div
            className={styles.completed_modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.completed_modal_content}>
              <img
                src="/check.gif"
                alt="신청 완료"
                className={styles.completed_modal_image}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <h2 className={styles.completed_modal_title}>
                신청이 완료되었습니다
              </h2>
              <button
                className={styles.completed_modal_button}
                onClick={() => setShowCompletedModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div
          className={styles.modal_overlay}
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className={styles.success_modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.success_modal_image_wrapper}>
              <img
                src="/landing_popup.png"
                alt="정책자금 지원 안내"
                className={styles.success_modal_image}
              />
              <button
                className={styles.success_modal_close}
                onClick={() => setShowSuccessModal(false)}
                aria-label="닫기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <rect
                    width="20"
                    height="20"
                    rx="10"
                    fill="black"
                    fillOpacity="0.3"
                  />
                  <path
                    d="M10 10.7985L7.20532 13.5932C7.10076 13.6977 6.96768 13.75 6.80608 13.75C6.64449 13.75 6.51141 13.6977 6.40684 13.5932C6.30228 13.4886 6.25 13.3555 6.25 13.1939C6.25 13.0323 6.30228 12.8992 6.40684 12.7947L9.20152 10L6.40684 7.20532C6.30228 7.10076 6.25 6.96768 6.25 6.80608C6.25 6.64449 6.30228 6.51141 6.40684 6.40684C6.51141 6.30228 6.64449 6.25 6.80608 6.25C6.96768 6.25 7.10076 6.30228 7.20532 6.40684L10 9.20152L12.7947 6.40684C12.8992 6.30228 13.0323 6.25 13.1939 6.25C13.3555 6.25 13.4886 6.30228 13.5932 6.40684C13.6977 6.51141 13.75 6.64449 13.75 6.80608C13.75 6.96768 13.6977 7.10076 13.5932 7.20532L10.7985 10L13.5932 12.7947C13.6977 12.8992 13.75 13.0323 13.75 13.1939C13.75 13.3555 13.6977 13.4886 13.5932 13.5932C13.4886 13.6977 13.3555 13.75 13.1939 13.75C13.0323 13.75 12.8992 13.6977 12.7947 13.5932L10 10.7985Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                className={styles.success_modal_button}
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowModal(true);
                }}
              >
                이어서 상담신청
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
