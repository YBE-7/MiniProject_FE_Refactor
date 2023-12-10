import accommodationAPI from 'apis/accommodationAPI';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RoomDetailInfo } from 'types/Place';
import { formatNumberWithCommas } from 'utils/numberComma';

export default function useGetRoomDetailInfo(roomId : string | undefined, price : string | null) {

    const [formattedPrice, setFormattedPrice] = useState<string>('');
    const navigate = useNavigate();
    const [roomInfo, setRoomInfo] = useState<RoomDetailInfo>();


    useEffect(() => {
        const getRoomDetail = async () => {
            if (roomId !== undefined) {
                try {
                    const id = +roomId;
                    const response = await accommodationAPI.getRoomDetail(id);
                    setRoomInfo(response.data.data);
                } catch (error) {
                    console.error('Failed to load Room detail info', error);
                    navigate('/404', { replace: true });
                }
            }
        };

        getRoomDetail();

    },[roomId]);

    useEffect(() => {
        if (price !== null) {
            setFormattedPrice(formatNumberWithCommas(parseInt(price)));
        }
    }, [price]);

  return [roomInfo , formattedPrice];
}
