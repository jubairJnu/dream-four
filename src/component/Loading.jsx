import { PropagateLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="text-center flex ">
   <div>   <PropagateLoader color="#36d7b7" /> </div>
      <p className='text-end'>loading..</p>
      {/* <p className='text-center text-2xl text-red-600'>Loading</p> */}
    </div>
  );
};

export default Loading;