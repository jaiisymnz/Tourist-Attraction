import trips from "../utils/db";
import { Link } from "lucide-react";
import { useState, useEffect } from "react";

export default function PostCard() {
  const [inputName, setInputName] = useState("");
  const [blogs, setBlogs] = useState(trips);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setInputName(value);

    if (value === "") {
      setBlogs(trips);
    } else {
      const filteredTrips = trips.filter(
        (trip) =>
          trip.title.toLowerCase().includes(value) || // ค้นหาจาก title
          trip.description.toLowerCase().includes(value) || // ค้นหาจาก description
          trip.tags.some((tag) => tag.toLowerCase().includes(value)) // ค้นหาจาก tag
      );
      setBlogs(filteredTrips);
    }
  };

  return (
    <div className="search-bar place-self-center mx-3 max-w-min-5/6 flex flex-col items-center mt-2 font-Bai Jamjuree">
      <h1 className="text-3xl font-bold text-center text-[#4796c5] ">
        เที่ยวไหนดี
      </h1>
      <p className="w-full">ค้นหาที่เที่ยว</p>
      <label htmlFor="input" className="w-full">
        <input
          className="border-b-2 border-black w-full text-center focus:outline-none focus:ring-0 focus:border-black"
          placeholder="ค้นหาที่เที่ยวแล้วไปกัน..."
          value={inputName}
          onChange={handleSearch}
        ></input>
      </label>
      <div className="post-card flex flex-col gap-10 my-7 w-full">
        {blogs.map((blog, index) => {
          return (
            <div key={index} className="flex gap-5 w-full">
              <a href={blog.url} target="blank">
                <img
                  src={blog.photos[0]}
                  className="w-64 h-48 rounded-2xl object-cover"
                />
              </a>

              <div className="card-right w-3/4">
                <h2 className="font-bold">{blog.title}</h2>
                <p className="text-sm">
                  {blog.description.length > 50
                    ? `${blog.description.substring(0, 100)}... `
                    : blog.description}
                </p>
                <a
                  href={blog.url}
                  target="_blank"
                  className="text-blue-400  underline w-fit"
                >
                  อ่านต่อ
                </a>
                <p>
                  หมวดหมู่ : &nbsp;
                  {blog.tags.map((tag, index) => (
                    <button
                      key={index}
                      className="mr-2"
                      onClick={() => {
                        const newInput = tag.toLowerCase(); // อัปเดต input เป็นค่าของ tag
                        setInputName(newInput);
                        handleSearch({ target: { value: newInput } }); // เรียก handleSearch ด้วยค่า tag
                      }}
                    >
                      {tag}
                      {index === blog.tags.length - 2 ? (
                        <span> และ</span>
                      ) : index < blog.tags.length - 2 ? (
                        ","
                      ) : (
                        ""
                      )}
                    </button>
                  ))}
                </p>

                <div className="preview-image flex flex-row justify-between items-center">
                  <div className="image flex gap-3 mt-3">
                    {blog.photos.map((photo, index) => {
                      if (index === 0) {
                        return null;
                      }
                      return (
                        <a href={blog.url} key={index}>
                          <img
                            src={photo}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        </a>
                      );
                    })}
                  </div>

                  <a
                    className="border-2 rounded-[999px] p-1 border-[#34a0d5]"
                    href={blog.url}
                  >
                    <Link color="#34a0d5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
