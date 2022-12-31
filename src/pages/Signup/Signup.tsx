import { ChangeEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useUser } from "../../context/UserContext";
import User from "../../types/User";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  photo: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { setUser } = useUser();
  const [photo, setPhoto] = useState("");

  const handlePhotoChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const apiKey = "e9bb5812e9997b781892f16ac6b11cc7";
    const imageFile = event.target.files?.[0];
    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", imageFile!);
    const loadingId = toast.loading("Uploading...");

    try {
      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      toast.dismiss(loadingId);
      setPhoto(result.data.url);
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingId);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { confirmPassword, ...otherData } = data;
    console.log({ ...otherData, photo });
    if (photo) {
      const loadingId = toast.loading("Loading...");
      try {
        const res = await fetch(
          "https://kaizenresale.000webhostapp.com/api/user/signup.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...otherData, photo }),
          }
        );
        const result = await (res.json() as Promise<{
          data: User;
          message?: string;
        }>);
        console.log(result);
        toast.dismiss(loadingId);
        toast.success(result.message!);
        setUser(result.data);
        localStorage.setItem("currentUser", JSON.stringify(result.data));
      } catch (error) {
        console.log(error);
        toast.dismiss(loadingId);
      }
    } else {
      toast.error("You need to upload a photo");
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 mt-2">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 mt-2">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 mt-2">Password is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 mt-2">
                  Confirm password is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pick your role</span>
              </label>
              <select
                {...register("role", { required: true })}
                className="select w-full max-w-xs input-bordered"
              >
                <option>user</option>
                <option>seller</option>
              </select>
              {errors.role && (
                <span className="text-red-500 mt-2">Role is required</span>
              )}
            </div>
            <div className="form-control">
              <input
                type="file"
                className="input input-bordered hidden"
                {...register("photo", { required: true })}
                id="photo"
                onChange={handlePhotoChange}
              />
              <label htmlFor="photo">
                <span className="btn btn-primary">
                  <AiOutlineCloudUpload className="text-2xl mr-2" /> Upload
                  Image
                </span>
              </label>
              {errors.photo && (
                <span className="text-red-500 mt-2">Photo is required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
