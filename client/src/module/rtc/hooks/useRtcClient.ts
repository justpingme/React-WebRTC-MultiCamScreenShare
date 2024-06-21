import { SocketSend, StartConnetionProps } from "../types"
import { useRtcClientHandler } from "./useRtcClientHandler"

export const useRtcClient = (send: SocketSend) => {
  const {
    createPeerConnection,
    setupListeners,
    createDataChannel,
    addTracks,
    makeOffer,
    handleOffer,
  } = useRtcClientHandler(send)

  const makePeerConnection = async (props: StartConnetionProps) => {
    const {
      localMember,
      remoteMember,
      streams,
      connectionPurpose,
      data,
      dataChannelName,
    } = props

    const peerConnection = createPeerConnection()
    setupListeners(peerConnection, localMember, remoteMember, connectionPurpose)
    const datachannel = createDataChannel(
      peerConnection,
      dataChannelName.toString(),
      remoteMember
    )
    addTracks(peerConnection, streams)

    if (data.offer) {
      await handleOffer(peerConnection, data, connectionPurpose)
    } else {
      await makeOffer(
        peerConnection,
        localMember,
        remoteMember,
        connectionPurpose
      )
    }

    return { peerConnection, datachannel }
  }

  return { makePeerConnection, makeOffer, handleOffer }
}
