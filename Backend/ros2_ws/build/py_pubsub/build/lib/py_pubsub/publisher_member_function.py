# Copyright 2016 Open Source Robotics Foundation, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import time
import rclpy
from rclpy.node import Node

from std_msgs.msg import String
from geometry_msgs.msg import Twist 
moveBindings = {
    'up': (1, 0, 0, 0),
    'down': (-1, 0, 0, 0),
    'rotate_left': (0, 0, 0, 1),
    'rotate_right': (0, 0, 0, -1),
    'o': (1, 0, 0, -1),
    'u': (1, 0, 0, 1),
    ',': (-1, 0, 0, 0),
    '.': (-1, 0, 0, 1),
    'm': (-1, 0, 0, -1),
    't': (0, 0, 1, 0),
    'b': (0, 0, -1, 0),
}
class MinimalPublisher(Node):

    def __init__(self,direction):
        super().__init__('minimal_publisher')
        stop_msg=Twist()
        stop_msg.linear.x=0.0
        stop_msg.linear.y=0.0
        stop_msg.linear.z=0.0
        stop_msg.angular.x=0.0
        stop_msg.angular.y=0.0
        stop_msg.angular.z=0.0
        self.publisher_ = self.create_publisher(Twist, 'cmd_vel', 10)
        #timer_period = 1  # seconds
        self.timer_callback(direction)
        time.sleep(1)
        self.publisher_.publish(stop_msg)
        self.get_logger().info('stop')
        self.destroy_node()
        rclpy.shutdown()
        #self.timer = self.create_timer(timer_period, self.timer_callback(direction))

    def timer_callback(self,direction):
        msg = Twist()
        if direction.get('move') is not None:
            msg.linear.x=float(moveBindings[direction['move']['direction']][0])
            msg.linear.y=float(moveBindings[direction['move']['direction']][1])
            msg.linear.z=float(moveBindings[direction['move']['direction']][2])
            msg.angular.z=float(moveBindings[direction['move']['direction']][3])
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg)
        #self.i += 1


def main(args=None):
    operation={
        'move':{
            'direction':'up',
            'distance':1,
            'time':1
        }
    }
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher(operation)

    rclpy.spin(minimal_publisher)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    minimal_publisher.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':

    main()