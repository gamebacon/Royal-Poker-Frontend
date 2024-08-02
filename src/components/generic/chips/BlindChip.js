import React from 'react'
import PropTypes from 'prop-types';

const BlindChip = (type) => {
  return (
    <div
        className={`rounded-full border p-2 size-4
          ${type.type === 'SMALL' ? 'bg-purple-500' : 'bg-yellow-500'}
        flex items-center justify-center absolute -top-1 -right-1
         text-[8px] font-semibold`}
    >
        {type.type === 'SMALL' ? 'SB' : 'BB'}
    </div>
  )
}

BlindChip.propTypes = {
  type: PropTypes.oneOfType(['SMALL', 'BIG'])
}

export default BlindChip;
