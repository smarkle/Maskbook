import { delay } from '@masknet/shared'
import { activatedSocialNetworkUI, SocialNetworkUI } from '../../index'
import { untilDocumentReady } from '../../../utils/dom'
import { MaskMessage } from '../../../utils/messages'
import { downloadUrl, pasteImageToActiveElements } from '../../../utils/utils'

export function pasteImageToCompositionDefault(hasSucceed: () => Promise<boolean> | boolean) {
    return async function (
        url: string | Blob,
        { recover, relatedTextPayload }: SocialNetworkUI.AutomationCapabilities.NativeCompositionAttachImageOptions,
    ) {
        const image = typeof url === 'string' ? await downloadUrl(url) : url
        await untilDocumentReady()
        if (relatedTextPayload) {
            activatedSocialNetworkUI.automation.nativeCompositionDialog?.appendText?.(relatedTextPayload, {
                recover: false,
            })
            await delay(500)
        }
        await pasteImageToActiveElements(image)

        if (await hasSucceed()) return
        if (recover) {
            MaskMessage.events.autoPasteFailed.sendToLocal({ text: relatedTextPayload || '', image })
        }
    }
}
