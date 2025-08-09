import { Users, UserPlus, Crown, Mail, Check, X, MessageSquare, Vote, DollarSign } from 'lucide-react';
import { useState } from 'react';

import { GroupMember, Vote as VoteType } from '../../entities/trip';

interface GroupTripManagerProps {
  groupMembers: GroupMember[];
  tripId: string;
}

export default function GroupTripManager({ groupMembers, tripId }: GroupTripManagerProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [activeVotes] = useState<VoteType[]>([
    {
      id: '1',
      tripId,
      title: 'Choose Restaurant for Day 2',
      description: 'Vote for our dinner location on the second day',
      options: [
        {
          id: '1',
          title: 'Le Comptoir du Relais',
          votes: ['1', '2'],
          cost: 45,
        },
        { id: '2', title: "L'As du Fallafel", votes: ['1'], cost: 15 },
        { id: '3', title: 'Breizh Café', votes: ['3'], cost: 25 },
      ],
      deadline: '2024-02-20',
      status: 'active',
      createdBy: '1',
    },
  ]);

  const organizer = groupMembers.find(member => member.role === 'organizer');
  const acceptedMembers = groupMembers.filter(member => member.status === 'accepted');
  const pendingMembers = groupMembers.filter(member => member.status === 'invited');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'declined':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Mail className="h-4 w-4 text-yellow-500" />;
    }
  };

  const handleInvite = () => {
    // Handle invite logic here
    console.log('Inviting:', inviteEmail);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Group Trip Management</span>
        </h3>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Invite</span>
        </button>
      </div>

      {/* Group Members */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Group Members ({acceptedMembers.length}/{groupMembers.length})
        </h4>

        {groupMembers.map(member => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <img
                src={
                  member.avatar ||
                  `https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1`
                }
                alt={member.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</span>
                  {member.role === 'organizer' && <Crown className="h-4 w-4 text-yellow-500" />}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{member.email}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(member.status)}
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  member.status === 'accepted'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : member.status === 'declined'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}
              >
                {member.status}
              </span>
            </div>
          </div>
        ))}

        {pendingMembers.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <span className="font-medium">{pendingMembers.length} pending invitation(s)</span>
            <p className="text-xs mt-1">Waiting for response from invited members</p>
          </div>
        )}
      </div>

      {/* Active Votes */}
      {activeVotes.length > 0 && (
        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
            <Vote className="h-4 w-4" />
            <span>Active Votes</span>
          </h4>

          {activeVotes.map(vote => (
            <div key={vote.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">{vote.title}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{vote.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Deadline: {new Date(vote.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {vote.options.map(option => {
                  const voteCount = option.votes.length;
                  const percentage = acceptedMembers.length > 0 ? (voteCount / acceptedMembers.length) * 100 : 0;

                  return (
                    <div key={option.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{option.title}</span>
                          {option.cost && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                              ${option.cost}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {voteCount} vote{voteCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="mt-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                Cast Your Vote
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Group Features */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium">Group Chat</span>
        </button>
        <button className="flex items-center justify-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
          <DollarSign className="h-4 w-4" />
          <span className="text-sm font-medium">Split Expenses</span>
        </button>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invite Group Member</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleInvite}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Send Invite
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
