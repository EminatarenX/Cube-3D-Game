import { MAIN_MENU } from "..";

const score = localStorage.getItem("record");
const record = score ? JSON.parse(score) : { totalJumps: 0, time: 0 };

export const landing = {
  name: MAIN_MENU,
  component: `
<section class="landing h-screen w-full flex flex-col justify-center items-center absolute gap-10 appear">
  <span class="text-white absolute top-10 left-5 text-xl"> Max Jumps IG: ${record.totalJumps}</span>
   <span class="text-white absolute top-20 left-5 text-xl">Max time: ${record?.time}</span>
    <h1 class="text-white text-[6rem] text-center animate-bounce" >Cube Dash</h1>
    <button class=" relative bg-sky-600  rounded hover:bg-teal-500 text-[5rem] transition-all duration-500 text-white font-bold  p-6 after:absolute after:-top-5 after:-left-5 after:blur shadow-2xl shadow-gray-500 after:-z-10 after:w-full after:h-full after:bg-rose-600 " id="play-button">
      Play 
    </button>

    <a href="https://github.com/EminatarenX" class="text-white absolute top-10 right-5 text-xl flex gap-2 items-center"> 
    <img src="https://static-00.iconduck.com/assets.00/github-icon-2048x2048-4uclrgic.png" class="w-10 h-10 invert" />
      EminatarenX
    </span>

</section>
`,
};
