import React, {useEffect} from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';
import NoHistory from './NoHistory';
import { useSelector } from 'react-redux';

function HistoryContent() {
    const { history } = useSelector((state: any) => state.oracle)
     
    return (
        <div>
            {history.length > 0 ? (
                <>
                    {history?.map(item => {
                        return (
                            <div key={item.translationUuid} className='"bg-sirp-listBg border h-[100%] border-sirp-primaryLess1 rounded-lg w-[100%] md:mx-2 my-1'>
                                <ListItem
                                    uuid={item.uuid}
                                    title={item.title} // Pass the title
                                    time={item.createdAt}
                                    isArchived={item.bookmark} // Pass the isArchived value
                                    // buttonType="action"
                                    actionButtons={<DeleteIcon doc={item.title} />}
                                />
                            </div>
                        );
                    })}
                </>
            ) : (
                <>
                    <NoHistory />
                </>
            )}
        </div>
    );
}

export default HistoryContent;