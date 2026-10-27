import unittest

from support import run_solution


class PrintInReverseOrderTest(unittest.TestCase):
    def test_case_01_hello_and_world(self):
        """Hello and World."""
        result = run_solution('print-in-reverse-order', 'Hello\nWorld\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'World\nHello\n')

    def test_case_02_first_and_second(self):
        """First and second."""
        result = run_solution('print-in-reverse-order', 'first\nsecond\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'second\nfirst\n')

    def test_edge_01_two_empty_lines(self):
        """Two empty lines."""
        result = run_solution('print-in-reverse-order', '\n\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n\n')

    def test_edge_02_unicode_lines(self):
        """Unicode lines."""
        result = run_solution('print-in-reverse-order', 'ఒకటి\nరెండు\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'రెండు\nఒకటి\n')


if __name__ == "__main__":
    unittest.main()
