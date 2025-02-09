import styled from 'styled-components';

const AddButton = (props:{onClick:()=>void}) => {
  return (
    <StyledWrapper>
      <button onClick={props.onClick}
      className="Btn dark:bg-[rgb(71, 85, 105)] rounded-full border-2 dark:border-slate-200 flex items-center justify-start w-[45px] h-[45px] cursor-pointer relative overflow-hidden duration-300">
        <div className="sign">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

            </div>
        <div className="text text-slate-800 dark:text-slate-200">Add</div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }`;

export default AddButton;
