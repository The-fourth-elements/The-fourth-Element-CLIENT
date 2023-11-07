import FilterKnowRegister from '@/features/user/knowledge/FilterKnowRegister';
import UserRecords from '@/features/user/knowledge/UserRecords';


const page = () => {
  return (
      <>
        <FilterKnowRegister />
        <UserRecords className={'w-full flex justify-center'}></UserRecords>
      </>
    )
}

export default page;