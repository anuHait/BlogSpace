import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";
import banner from "../assets/bg.webp";
import * as Yup from "yup";
import axios from "axios";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { Cookies } from "react-cookie";
import { MutatingDots } from "react-loader-spinner";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" },{ list: "bullet" },{ indent: "-1" },{ indent: "+1" },],
    ["link"],
  ]
}


const NewProject = (props) => {
  const cookies = new Cookies();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [value, setValue] = useState('');

  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});
  // const [isEVP, setIsEVP] = useState();

  const loadingHandle = (e) => {
    setLoading(e);
  };

  const validate = Yup.object().shape({
    url: Yup.string()
      .required("URL is required")
      .url("Please enter a valid URL starting with https://"),
  });

  useEffect(() => {
    validate
      .validate({ url })
      .then(() => setErrors({}))
      .catch((err) => setErrors({ url: err.errors[0] }));
  }, [url]);

  useEffect(() => {
    // console.log("Load Changed");
  }, [isLoading]);
  
  const user = cookies.get("accessToken");
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [resp, setResp] = useState();
  var title,
    tagline,
    description,
    imgURL,
    category,
    tech_stacks,
    isNW,
    isEVP,
    isSC,
    slug;
  const [image, setImage] = useState("");
  // const [imgURL, setImgURL] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    


    if (image === "") {
      setError(true);
    } else {
      loadingHandle(true);
      setError(false);

      description = value;
      // console.log("Description: ",description);
      const formData = new FormData(event.target);
      title = formData.get("title");
      tagline = formData.get("tagline");
      // description = formData.get("description");

      // setUrl(formData.get("url"));
      category = formData.get("category");
      tech_stacks = formData.get("tech_stacks");
      isNW = formData.get("isNW");
      isSC = formData.get("isSC");
      isEVP = formData.get("isEVP");
      console.log("isEVP:",isEVP);
      slug = formData.get("slug");

      listProject();
    }
  };

  const handleChangeURL = (event) => {
    setUrl(event.target.value);
  };

  async function listProject() {
    loadingHandle(true);

    await uploadImage();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
      name: cookies.get("name"),
      username: cookies.get("username"),
      id: cookies.get("username") + "-" + title.toLowerCase().replaceAll(" ", "-"),
      title: title,
      tagline: tagline,
      description: description,
      url: url,
      category: category,
      tech_stacks: tech_stacks,
      cover_img: imgURL,
      isNW: !isNW ? false : true,
      isShipCrew: !isSC ? false : true,
      isEVP: !isEVP ? false : true,
      slug: slug,
    });

    

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: data,
      redirect: "follow",
    };

    fetch("https://hudn-backend-dev.vercel.app/api/new-project", requestOptions)
      .then((response) => {
        response.json();
        loadingHandle(false);
        navigate("/success");
      })
      .catch((error) => {
        console.log("error", error);
        navigate("/error");
    });
      
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "hudnimage");
    data.append("cloud_name", "dzpebuulu");
    await fetch("https://api.cloudinary.com/v1_1/dzpebuulu/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        imgURL = data.url;
      })
      .catch((err) => console.log(err));
  }
  const headers = {
    Accept: "application/json",
    accesstoken: `${user}`,
    "Content-Type": "application/json",
    // origin: "http://localhost:3000",
    "ngrok-skip-browser-warning": "69420",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, Accept, accesstoken , ngrok-skip-browser-warning",
  };

  async function handleChange() {
    fetch("https://hudn-backend-dev.vercel.app/signin/google", {
      mode: "cors",
      //credentials:'include',
      Method: "GET",
      headers: headers,
    }).then(async (res) => {

      var re = await res.status;
      if (re === 200)
        setIsOpen(true);
      else
        navigate("/start");
    });
  }

  return (
    <div>
      <button
        onClick={handleChange}
        className="shrink-0 pc bg-hudn-blue text-white outline-none block text-center anim md:w-fit md:text-2xl justify-center items-center p-3 md:flex gap-1 md:px-6 hover:drop-shadow-md drop-shadow-xl rounded-full z-10"
      >
        <p className="text-sm">List a Project</p>+
      </button>
      
      <button
        onClick={handleChange}
        className="shrink-0 mob ring-white ring-2 text-3xl w-12  h-12 topppp fixed mob bottom-8 right-8 flex justify-center rounded-full drop-shadow-xl bg-hudn-blue text-center text-white items-center gap-2 "
      >
      +
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="popup-open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className={`${
              isOpen ? "" : "hidden"
            } fixed centerh top-0 h-screen backdrop-blur-lg topppp w-full `}
          >
          <div className="w-screen h-screen absolute top-0 " onClick={() => setIsOpen(false)} ></div>
          <div className="flex flex-col drop-shadow-sm -z-20 m-auto rounded-2xl w-full anim md:w-3/4 lg:w-[55%] max-h-[80vh] md:mt-2 gap-0 " >
            <form
                onSubmit={handleSubmit}
                autoComplete="on"
                key="signup"
                className=""
              >
                <div className="overflow-y-scroll max-h-[83vh] noscr rounded-lg rounded-b-none relative bg-white px-6 md:px-12 pb-5 py-12 flex flex-col gap-8">
                  <label
                    htmlFor="upload_img"
                    className="relative flex mt-8 pt-12 text-white font-bold text-center text-md md:text-xl z-90 justify-center items-center cursor-pointer  py-10 "
                  >
                    <img
                      className="m-auto absolute w-full opacity-70 object-cover h-[7rem] shadow-lg mb-1 "
                      alt=""
                      src={image ? URL.createObjectURL(image) : banner}
                    />

                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setError(false);
                      }}
                      className="hidden"
                      id="upload_img"
                    ></input>
                    <p className="drop-shadow-md flex gap-2">
                      <MdAddPhotoAlternate size="20px" />
                      Add a Cover Image of your Project (1920x1080)
                    </p>
                  </label>
                  
                  <div className="relative w-full">
                    <p className="-top-[1rem] absolute bg-white p-2 text-xs ml-3 text-black/60 toppp w-fit ">
                      Title of your Project{" "}
                      <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="text"
                      name="title"
                      required
                      autoFocus
                      className="p-4 rounded-lg w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid"
                      placeholder="HUDN"
                    />
                  </div>
                  <div className="relative w-full">
                    <p className="-top-[1rem] absolute bg-white p-2 text-xs ml-3 text-black/60 toppp w-fit ">
                      Tagline of your Project{" "}
                      <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="text"
                      name="tagline"
                      required
                      className="p-4 rounded-lg w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid"
                      placeholder="the showcase"
                    />
                  </div>
                  <div className="relative w-full">
                    <p className="-top-[1rem] absolute bg-white p-2 text-xs ml-3 text-black/60 toppp w-fit ">
                      Description <span className="text-red-500">*</span>
                    </p>
                    <div className="rounded-lg w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid">
                      <ReactQuill placeholder="few words about your project... How you built it?? What did it take to build?..." modules={modules} theme="snow" value={value} onChange={setValue} />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <p className="-top-[1rem] absolute bg-white p-2 text-xs ml-3 text-black/60 toppp w-fit ">
                      Project Link {/* <span className="text-red-500">*</span> */}
                    </p>
                    <input
                      type="link"
                      name="url"
                      onChange={handleChangeURL}
                      required
                      className="p-4 rounded-lg w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid"
                      placeholder="https://www.example.com"
                    />
                  {errors.url && <div className="ml-2 mt-2 text-red-400 text-sm">{errors.url}</div>}
                  </div>
                  <div className="relative w-full">
                    <p className="-top-[1rem] absolute bg-white p-2 text-xs ml-3 text-black/60 toppp w-fit ">
                      Tech Stack <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="techstack"
                      name="tech_stacks"
                      required
                      className="p-4 rounded-lg w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid"
                      placeholder="Python, Solana, React"
                    />
                  </div>
                  <div className="relative w-full">
                    <p className="-top-[1rem] absolute bg-white p-2 text-xs ml-3 text-black/60 toppp w-fit ">
                      Category <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="category"
                      name="category"
                      required
                      className="p-4 rounded-lg w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid"
                      placeholder="Ex. Artificial Intelligence"
                    />
                  </div>
                  <div className="relative w-full">
                    <p className="-top-[1rem] absolute bg-white p-2 text-xs ml-3 text-black/60 toppp w-fit ">
                      Unique URL Slug (..../projects/
                      <span className="font-bold text-hudn-blue">
                        hudn
                      </span>) <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="slug"
                      name="slug"
                      required
                      className="p-4 rounded-lg w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid"
                      placeholder="Ex. hudn"
                    />
                  </div>
                  <div className="flex flex-row gap-2 max-[740px]:flex-col max-[740px]:gap-4">
                    <div className="relative w-full">
                      <p className="-top-[1rem] absolute bg-white pt-2 text-xs ml-3 text-black/60 toppp w-fit ">
                        Is this a Nights & Weekends Project{" "}
                        <span className="text-red-500">*</span>
                      </p>
                      <div className="p-4 rounded-lg  w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid">
                        <input
                          className="p-3 mt-2"
                          type="checkbox"
                          id="yes"
                          name="isNW"
                          value="true"
                        />{" "}
                        Yes
                      </div>
                    </div>
                    <div className="relative w-full">
                      <p className="-top-[1rem] absolute bg-white pt-2 text-xs ml-3 text-black/60 toppp w-fit ">
                        Is this a ShipCrew project{" "}
                        <span className="text-red-500">*</span>
                      </p>
                      <div className="p-4 rounded-lg  w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid">
                        <input
                          className="p-3 mt-2"
                          type="checkbox"
                          id="yes"
                          name="isSC"
                          value="true"
                        />{" "}
                        Yes
                      </div>
                    </div>
                    <div className="relative w-full">
                      <p className="-top-[1rem] absolute bg-white pt-2 text-xs ml-3 text-black/60 toppp w-fit ">
                        Is this an EdVenture Park project{" "}
                        <span className="text-red-500">*</span>
                      </p>
                      <div className="p-4 rounded-lg  w-full bg-white border-2 outline-none focus:drop-shadow-xl focus:border-hudn-blue/70 hover:border-hudn-blue/30 anim border-gray-100 border-solid">
                        <input
                          className="p-3 mt-2"
                          type="checkbox"
                          id="yes"
                          name="isEVP"
                          value="true"
                        />{" "}
                        Yes
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div>{error && <div className="pl-12 bg-white text-red-400 text-sm text-left ">Please add a cover image</div>}</div>
                <div className="flex z-[9999]  border-t-black/10 w-full p-6 md:px-12 bg-white items-center justify-between gap-4">
                  {isLoading ? (
                    
                      <MutatingDots
                        height="100"
                        width="100"
                        color="#6A72FA"
                        secondaryColor="#9999EE"
                        radius="12.5"
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    
                  ) : (
                    <div
                      onClick={() => setIsOpen(false)}
                      className="py-5 cursor-pointer px-6 w-max flex gap-1 items-center bg-red-500 uppercase text-center rounded-full drop-shadow-xl hover:drop-shadow-lg anim text-white"
                    >
                      <BsFillTrashFill />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="py-4 px-8 z-[9999] w-full bg-hudn-blue rounded-full hover:drop-shadow-xl anim text-white "
                  >
                    List your Project
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            key="popup-close"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewProject;