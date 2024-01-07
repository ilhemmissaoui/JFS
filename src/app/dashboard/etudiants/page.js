'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfilCard from '@/components/ProfilCard';
import Spinner from '@/components/Spinner';
import Stats from '@/components/stats/stats';
import PaginationNav from '@/components/molecules/PaginationNav';
import { FiSquare } from 'react-icons/fi';
import { getStudentsPerPage } from '@/store/features/student/studentSlice';
import FilterComponent from '@/components/filters/filter';
import FilterComponentOptions from '@/components/filters/filterOption';
const Etudiant = () => {
  const { user } = useSelector((state) => state.auth);
  // State for the filter text
  const [filterText, setFilterText] = useState('');

  // Function to handle filter changes
  const handleFilterChange = (newText) => {
    setFilterText(newText);
    // Implement your filter logic here based on the newText
    // For example, you can filter studentsList based on the name containing the newText.
  };

  const row = 8;
  //select all section
  const [selectedStudents, setSelectedStudents] = useState([]);
  // Function to toggle the selection state of an individual card
  const toggleStudentSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Function to select all cards
  const selectAllStudents = () => {
    if (selectedStudents.length === studentsList.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(studentsList.map((student) => student.id));
    }
  };

  // modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isLoading, totalPages, studentsList, message, isError, isSuccess } =
    useSelector((state) => state.student);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Pagination Props : handling page changes, next and prev button
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentsPerPage({ token: user.token, page: active, row }));
  }, [dispatch, active]);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
    dispatch(getStudentsPerPage({ token: user.token, page: active, row }));
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    dispatch(getStudentsPerPage({ token: user.token, page: active, row }));
  };

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value, 10);
    setActive(page);
    dispatch(getStudentsPerPage({ token: user.token, page: active, row }));
  };
  // Filter the studentsList based on filterText
  const filteredStudents = studentsList.filter((student) =>
    student?.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  const [filterText2, setFilterText2] = useState('');
  const [selectedOption, setSelectedOption] = useState('name'); // Default option

  // Function to handle filter changes
  const handleFilterChange2 = (newText, option) => {
    setFilterText(newText);
    setSelectedOption(option);
    // Implement your filter logic here based on the newText and selectedOption
    // For example, you can filter studentsList based on the selected option and filter text.
  };

  // Define filtering options
  const filterOptions = [
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    // Add more filtering options as needed
  ];
  return (
    <div>
      <Stats />
      {/* Render the filter component */}
      <div className='grid grid-cols-4 gap-6'>
        <FilterComponentOptions
          onFilterChange={handleFilterChange2}
          options={filterOptions}
        />
        <FilterComponentOptions
          onFilterChange={handleFilterChange2}
          options={filterOptions}
        />
        <FilterComponentOptions
          onFilterChange={handleFilterChange2}
          options={filterOptions}
        />
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      <div className='flex justify-left items-center gap-5'>
        <label className='mt-2 flex justify-center items-center gap-2'>
          <FiSquare className='text-[#00E869]' fill='#00E869' size='1.5rem' />
          En contrat
          <input type='checkbox' className='h-4 w-4' />
        </label>
        <label className='mt-2 flex justify-center items-center gap-2'>
          <FiSquare className='text-[#FFA42D]' fill='#FFA42D' size='1.5rem' />
          En cours
          <input type='checkbox' className='h-4 w-4' />
        </label>
        <label className='mt-2 flex justify-center items-center gap-2'>
          <FiSquare className='text-[#FF2F00]' fill='#FF2F00' size='1.5rem' />
          En recherche
          <input type='checkbox' className='h-4 w-4' />
        </label>
        <label className='mt-2 flex justify-center items-center gap-2'>
          <FiSquare
            className='text-[#1900fff1]'
            fill='#1900fff1'
            size='1.5rem'
          />
          Incomplet
          <input type='checkbox' className='h-4 w-4' />
        </label>
      </div>
      <div className='bg-[#F8F9FC] mt-6 rounded-lg'>
        <div className='mx-10 px-2 py-1 font-medium text-lg '>
          <label className='mt-2'>
            <input
              type='checkbox'
              checked={selectedStudents.length === studentsList.length}
              onChange={selectAllStudents}
              className='h-4 w-4 mx-4 mt-4'
            />
            Sélectionner tout
          </label>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='mx-10 px-2 py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
            {filteredStudents.map((student) => (
              <div key={student?.id}>
                <ProfilCard
                  row={row}
                  student={student}
                  isSelected={selectedStudents.includes(student.id)}
                  toggleSelection={() => toggleStudentSelection(student.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <PaginationNav
        lastPage={totalPages}
        active={active}
        handlePageChange={handlePageChange}
        next={next}
        prev={prev}
      />
    </div>
  );
};
export default Etudiant;
