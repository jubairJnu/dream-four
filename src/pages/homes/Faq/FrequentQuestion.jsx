

const FrequentQuestion = () => {
  return (
    <div className="mt-16 md:px-6 ">
      <h1 className="text-center font-bold text-2xl">Frequently Asked Questin</h1>
      <div className="collapse collapse-arrow shadow-2xl mb-2 border-4 border-base-100">
  <input type="radio" name="my-accordion-2" checked="checked" /> 
  <div className="collapse-title text-xl font-medium text-blue-500">
    Click to open this one and close others
  </div>
  <div className="collapse-content bg-[#1653B2] text-white"> 
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-arrow shadow-2xl mb-2">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium text-blue-500">
    Click to open this one and close others
  </div>
  <div className="collapse-content bg-[#1653B2] text-white "> 
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-arrow shadow-2xl mb-2">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium text-blue-500">
    Click to open this one and close others
  </div>
  <div className="collapse-content bg-blue-500 text-white "> 
    <p >hello</p>
  </div>
</div>
    </div>
  );
};

export default FrequentQuestion;