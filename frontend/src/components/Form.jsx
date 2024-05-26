import * as React from "react";
import google from "../assets/search.png";

// Import the curly font
//import curlyFont from "./curly-font.ttf";

export default function Form({ handleLogin, handleFace }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white px-10 py-20 rounded-3xl border-2 border-grey-200">
        {/* Apply the curly font to the welcome text */}
        <h6 className="text-5xl font-vegan-style">Welcome to BlocBuddy</h6>
        <p className="font-medium text-lg text-gray-500 mt-4"></p>

        <div className="mt-8">
          {/* <div>
            <label htmlFor="" className="text-lg font-medium">
              Email
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your email"
            />
          </div> */}

          <div className="mt-8 flex flex-col gap-y-4">
            {/* <button
              className="flex active:scale-[.98] active:duration-75 items-center justify-center gap-2 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl text-white text-lg font-bold"
              style={{ backgroundColor: "rgb(12, 20, 44)" }}
              onClick={handleFace}
            >
              <img src={face} alt="" />
              Facial Recognition
            </button> */}

            <button
              className="flex rounded-xl py-3 border-2 border-black-200 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
              onClick={handleLogin}
            >
              <img src={google} alt="" />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
