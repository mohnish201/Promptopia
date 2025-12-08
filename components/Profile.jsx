import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {
         data.length > 0 ? data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          )) : <h2 className='mt-10 font-semibold text-gray-500 text-center text-xl'>
            No prompts Created
          </h2>
        }
      </div>
    </section>
  );
};

export default Profile;
