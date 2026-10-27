import unittest

from support import run_solution


class DrawingASimpleTriangleWithPythonTest(unittest.TestCase):
    def test_case_01_no_input(self):
        """No input."""
        result = run_solution('drawing-a-simple-triangle-with-python', '')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '*\n**\n')

    def test_edge_01_extra_stdin_is_ignored(self):
        """Extra stdin is ignored."""
        result = run_solution('drawing-a-simple-triangle-with-python', 'ignored\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '*\n**\n')


if __name__ == "__main__":
    unittest.main()
