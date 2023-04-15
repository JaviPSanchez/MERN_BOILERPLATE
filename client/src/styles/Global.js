const styles = {
  optionCounterButton:
    "w-[30px] h-[30px] border-2 border-solid border-primaryLight disabled:cursor-not-allowed",
  optionCounterNumber: "w-[30px] h-[30px] flex justify-center items-center",

  fLists: "w-full flex justify-between",
  fList: "list-none p-0",
  fListItem: "mb-2 text-pwhite cursor-pointer",
  searchItem:
    "border-2 border-solid border-gray-200 p-2.5 rounded-xl flex justify-between gap-5 mb-5",
  siImg: "w-[200px] h-[200px] object-cover",
  siDesc: "flex flex-col gap-2.5 flex-2",
  siTitle: "text-xs text-primaryLight",
  siDistance: "text-xs",
  siTaxiOp: "text-xs bg-green text-white max-w-fit p-2 rounded-md",
  siSubTitle: "text-xs font-bold",
  siFeatures: "text-xs",
  siCancelOp: "text-xs text-green font-bold",
  siCancelOpSubtitle: "text-xs text-green",
  siDetails: "flex-1 flex flex-col justify-between",
  siRating:
    "[&>span]:font-medium [&>span]:mr-6 [&>button]:bg-primary [&>button]:text-white [&>button]:p-1 [&>button]:font-bold [&>button]:border-none",
  siDetailTexts: "text-right flex flex-col gap-2",
  siPrice: "text-xl",
  siTaxOp: "text-xs text-grey-200",
  siCheckButton:
    "bg-primaryLight text-white font-bold px-2 py-2 border-none cursor-pointer rounded-xl",
  lsItem:
    "flex flex-col gap-2 mb-5 [&>label]:text-xs [&>input]:h-8 [&>input]:border-none [&>input]:p-2 [&>span]:h-8 [&>span]:p-2 [&>span]:bg-white [&>span]:flex [&>span]:items-center [&>span]:cursor-pointer",
  lsOptionItem: "flex justify-between mb-5 text-grey text-xs",
  lsOptionInput: "w-12",
  listSearch:
    "[&>button]:p-2 [&>button]:bg-primaryLight [&>button]:text-white [&>button]:border-none [&>button]:w-full [&>button]:font-bold [&>button]:cursor-pointer",
};

export default styles;
