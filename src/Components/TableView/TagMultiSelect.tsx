import React, { useState, useRef, useEffect } from 'react';
import { useSnackbar } from "notistack";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedColumns } from '../../redux/slices/authSlice';

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
    <path d="M7 7h.01"/>
  </svg>
);

interface TagMultiSelectProps {
  columns:any[]
  columnVisibility : Record<string , boolean>,
  setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const TagMultiSelect: React.FC<TagMultiSelectProps> = ({ columns , columnVisibility , setColumnVisibility }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  
  const [isOpen , setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedTagCount = Object.values(columnVisibility || {}).filter(v => v).length
  
  const headerMap:Record<string , string>={}
  columns.forEach(col=>{
    headerMap[col.accessorKey] = col.header
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (tag:string , checked:boolean)=>{
    if(checked){
      removeTag(tag)
    }else{
      toggleTag(tag)
    }
  }

  const removeTag = (tag:string)=>{
    if (selectedTagCount <= 1) {
      enqueueSnackbar("Keep at least one column in table", { variant: "error" });
      return;
    } 
    setColumnVisibility(prev => {
    const updated = { ...prev, [tag]: false };
    dispatch(updateSelectedColumns(updated));
    return updated;
  });
  }

  const toggleTag = (tag:string)=>{
    setColumnVisibility(prev => {
    const updated = { ...prev, [tag]: !prev[tag] };
    dispatch(updateSelectedColumns(updated));
    return updated;
  });
  }

  const limit = window.innerWidth < 640 ? 1 : window.innerWidth < 1200 ? 2 :  3;

  return (
      <div className="w-full max-w-2xl" ref={wrapperRef}>
        <div className="relative">
           <div className="flex flex-wrap items-center gap-2 p-2 min-h-6 md:min-h-10 text-sm border border-slate-300 dark:border-neutral-500 bg-white dark:bg-neutral-600 rounded-md cursor-text shadow-sm focus-within:ring-2" onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}  >
              {Object.keys(columnVisibility).filter((key) => columnVisibility[key] === true).slice(0,limit).map((tag)=>( 
                <div key={tag} className="relative group flex items-center gap-1.5 bg-[#97bdbd] dark:bg-bg-primary cursor-pointer font-medium px-2 py-1 rounded-full text-[9px] md:text-[12px] lg:text-xs">
                 
     
                  <TagIcon />{headerMap[tag]}
                  
                  <button type="button"  
                    onClick={(e) => {
                      e.stopPropagation();
                        removeTag(tag); 
                    }}  
                    className={`cursor-pointer hover:bg-green-700 rounded-full ${  selectedTagCount <= 1 ? "opacity-40 cursor-not-allowed" : "" }`} >
                    <XIcon />
                  </button>
                </div>
              ))}
              {selectedTagCount > limit && (
                <span className="text-[9px] md:text-[12px] lg:text-xs ml-1 text-secondary dark:text-table-header">
                  +{selectedTagCount - limit} {t("more")}
                </span>
              )}

              {selectedTagCount <= limit && (
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className="flex-1 bg-transparent outline-none text-sm min-w-[60px]"  />
              )}
           </div>

           {isOpen && (
            <div className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto bg-white dark:bg-neutral-700 dark:border-neutral-500 border rounded-md shadow-lg">
              <ul className="p-1 space-y-1">
                {Object.keys(columnVisibility || {}).map((tag)=>{
                  const checked = columnVisibility?.[tag]
                  return (
                    <li key={tag} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-600">
                        <input checked={checked} onChange={()=> handleToggle(tag,checked)}
                         type="checkbox"  className="cursor-pointer bg-bg-dark-primary"/>   
                        <label onClick={()=> handleToggle(tag,checked)}  className="flex-1 cursor-pointer dark:text-neutral-300">{headerMap[tag]}</label>  
                    </li>
                  )
                })}
              </ul>
            </div>
           )}
        </div>
      </div>
  );
}

export default function TagMultiSelectPage({
  columns,
  columnVisibility ,
  setColumnVisibility
}: TagMultiSelectProps) {
  return (
    <div className="text-sm">
      <div className="w-full max-w-2xl">
        <TagMultiSelect
          columns = {columns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
      </div>
    </div>
  );
}