"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import DrawerData from "./data";

const DrawerContext = React.createContext();

export const useDrawer = () => {
  return useContext(DrawerContext);
};

const Drawer = ({ children }) => {
  const [activate, setActivate] = useState(false);
  const [translateY, setTranslateY] = useState(100);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const items = DrawerData();
  const router = useRouter();

  // Group items by section and identify super menu items
  const { groupedItems, superMenuItems } = items.reduce(
    (acc, item) => {
      const section = item.section;
      if (section) {
        if (!acc.groupedItems[section]) acc.groupedItems[section] = [];
        acc.groupedItems[section].push(item);
      } else {
        acc.superMenuItems.push(item); // Treat items with no section as super menu
      }
      return acc;
    },
    { groupedItems: {}, superMenuItems: [] }
  );

  const closeDrawer = () => {
    setActivate(false);
  };

  useEffect(() => {
    const mainContent = document.querySelector("[data-main-content]");
    if (activate) {
      document.querySelector("[data-drawer]").style.display = "flex";
      setTimeout(() => {
        setTranslateY(45);
        setBgOpacity(0.8);
        if (mainContent) {
          document.body.classList.add("overflow-hidden");
          mainContent.style.transform =
            "scale(0.95) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)";
        }
      }, 50);
    } else {
      setTranslateY(100);
      setBgOpacity(0);
      if (mainContent) {
        mainContent.style.removeProperty("transform");
        document.body.classList.remove("overflow-hidden");
      }
      setTimeout(() => {
        document.querySelector("[data-drawer]").style.display = "none";
      }, 300);
    }
  }, [activate]);


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const movement = (e.movementY / window.innerHeight) * 100;
        let newTranslateY = Math.min(100, Math.max(44, translateY + movement));
        let newOpacity = Math.max(0, 0.8 - (newTranslateY - 45) / 80);

        setBgOpacity(newOpacity);
        setTranslateY(newTranslateY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const mainContent = document.querySelector("[data-main-content]");

      if (translateY >= 65) {
        setTranslateY(100);
        setBgOpacity(0);
        if (mainContent) {
          mainContent.style.transform = "scale(1) translate3d(0, 0, 0)";
          document.body.classList.remove("overflow-hidden");
        }
        setTimeout(() => {
          setActivate(false);
        }, 300);
      } else {
        setTranslateY(45);
        setBgOpacity(0.8);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, translateY]);

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === "m") {
      setActivate((prevState) => !prevState);
    }
    if (e.key === "Escape") {
      setActivate(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const renderItems = () => {
    // Handle items without a section as "super menu" items
    const superMenuItems = items.filter(item => !item.section);

    return (
      <div>
        {/* Render super menu items as top-level */}
        <div className="">
          {superMenuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.perform}
              className="hover:text-gray-400 text-[#FAFAFA] flex gap-3 items-center mt-2 text-base"
            >
              {item.title} {item?.tag && (
                <span className="text-xs px-1.5 py-[1px] rounded-full bg-purple-500 text-white">{item.tag}</span>
              )}
            </button>
          ))}
        </div>

        {/* Render grouped items for those with sections */}
        {Object.entries(groupedItems).map(([section, items], index) => (
          <div key={index} className="mt-4">
            <span className="font-medium">{section}</span>
            <div className="text-base text-[#a1a1aa]">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.perform}
                  className="hover:text-gray-500 mt-2 flex gap-3 items-center"
                >
                  {item.title}  {item?.tag && (
                    <span className="text-xs px-1.5 py-[1px] rounded-full bg-purple-500 text-white">{item.tag}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <DrawerContext.Provider value={{ setActivate }}>
      <div
        data-drawer
        style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`, display: "none" }}
        onClick={closeDrawer}
        className={`w-full h-full fixed top-0 left-0 z-[2000] justify-center items-end transition-all duration-300`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full bg-background rounded-lg border flex flex-col transition-all duration-300 ease-out"
          style={{ transform: `translateY(${translateY}%)` }}
        >
          <button
            className="cursor-grab pt-6 pb-5 w-full flex items-center justify-center"
            onMouseDown={() => setIsDragging(true)}
          >
            <div className="w-40 rounded-full h-[2px] bg-border" />
          </button>
          <div className="flex h-[calc(100%-51%)] flex-col items-start px-5 py-3 gap-2 text-base text-[#FAFAFA] overflow-auto">
            {renderItems()}
          </div>
        </div>
      </div>
      {children}
    </DrawerContext.Provider>
  );
};

export default Drawer;
