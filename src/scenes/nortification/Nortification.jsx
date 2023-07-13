import React from 'react'

const Nortification = () => {
    return (
        <div>

            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="..." className="rounded mr-2" alt="..."/>
                        <strong className="mr-auto">Bootstrap</strong>
                        <small className="text-muted">11 mins ago</small>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>
        </div>
    )
}

export default Nortification