import React from 'react'

function SampleCredentials({user, userid, password}) {
  return (
    <div>
        <dl>
            <dt>{user}</dt>
            <dd>User ID: {userid}</dd>
            <dd>Password: {password}</dd>
        </dl>
    </div>
  )
}

export default SampleCredentials