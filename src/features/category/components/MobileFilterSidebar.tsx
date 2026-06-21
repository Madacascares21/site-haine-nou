import { Button } from '#/components/ui/button'
import { FilterIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '#/components/ui/sheet'
import { FilterSidebar } from './filter-sidebar'

const MobileFilterSidebar = () => {
    return (
        <div className=' md:hidden '>
            <Sheet>
                <SheetTrigger asChild className='flex items-center gap-1 '><Button variant={"outline"} className=''><FilterIcon className='text-muted-foreground'/> Toate filtrele</Button></SheetTrigger>
                <SheetContent className='w-1/2'>
                    <SheetHeader>
                        <SheetTitle>Filtre</SheetTitle>
                        <SheetDescription>
                           <FilterSidebar className='block text-black'/>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            </div>
    )
}

export default MobileFilterSidebar