import { IBuildState, IBuild } from '../BuildStateContext'
import { MutationFunctionOptions, ExecutionResult } from 'react-apollo'
import { createNewBuild } from './create'

export const handleAddRevision = async (
  createSkillSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  createSetSelections: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  createBuild: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  addBuildToRevision: (
    options?: MutationFunctionOptions<any, any> | undefined
  ) => Promise<void | ExecutionResult<IBuild>>,
  state: IBuildState
) => {
  const build: any = await createNewBuild(
    createSkillSelections,
    createSetSelections,
    createBuild,
    state
  )
  if (build && build.data) {
    await addBuildToRevision({
      variables: { id: state.revision.id, buildId: build.data.createBuild.id },
    })
  }
}
